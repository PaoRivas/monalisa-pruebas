const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta?wsdl';
const fs = require('fs');
const path = require('path')
const {createXML} = require('../lib/createxml');
const zlib = require('zlib');
const helpers = require('../lib/helpers');
const syncApi = require('./sincronizacion_api');
const { pipeline } = require('stream/promises');
const CodigosRepo = require('../db/codigos.repo');
const RecepcionRepo = require('../db/recepcion.repo');
const OperacionesRepo = require('../db/operaciones.repo')
const tar = require('tar');

const addfactura = async (data) => {

  const xml_path = path.join(__dirname, "../public/files/factura.xml");
  const gz_path = path.join(__dirname, "..", "public", "files", "factura.gz");
  const xsd_path = path.join(__dirname, "..", "public", "files", "facturaComputarizadaCompraVenta.xsd");

  const num = await RecepcionRepo.getNumeroFactura();
  const numero = num ? (num+1).toString() : '1';
  
  const {codigoDocumentoSector, codigoEmision, codigoModalidad, cufd, tipoFacturaDocumento, ...restData} = data;
  const bodyFecha = {funcion: "sincronizarFechaHora", ...restData}
  const fecha = await syncApi.getsync(bodyFecha);

  const {nit, codigoSucursal, codigoPuntoVenta} = data;
  const lastcufd = await CodigosRepo.getLastCufd(codigoPuntoVenta);
  const cuf = helpers.getCUF(nit, fecha, codigoSucursal, codigoModalidad, codigoEmision, tipoFacturaDocumento, codigoDocumentoSector, numero, codigoPuntoVenta, lastcufd.codigo_control);

  const xml = createXML(fecha, cufd, cuf, numero, codigoPuntoVenta);
  fs.writeFileSync(xml_path, xml);
  const validate = helpers.validationXmlXsd(xml_path, xsd_path);
  
  if (validate) {
    //fs.createReadStream(xml_path).pipe(zlib.createGzip()).pipe(fs.createWriteStream(gz_path));
    await pipeline(
      fs.createReadStream(xml_path),
      zlib.createGzip(),
      fs.createWriteStream(gz_path)
    );
    const hashCode = helpers.getHashCode(gz_path);
    const buff = fs.readFileSync(gz_path);
    const base64data = buff.toString('base64');

    const {token, ...soapData} = data;
    const facturaData = {archivo: base64data, fechaEnvio: fecha, hashArchivo: hashCode};
    const args = {SolicitudServicioRecepcionFactura: {...soapData, ...facturaData}};
    const client = await getClient(url);
    client.addHttpHeader('ApiKey', `TokenApi ${token}`);
    const response = await client.recepcionFacturaAsync(args);
    const result = Object.values(response[0])[0];
    const send = {...result, ...facturaData, cuf, numero}
    return send;
  }  
};

const addpaquete = async (data) => {

  const targz_path = path.join(__dirname, `../public/files/paquetedos/paquete.tar.gz`);

  const {codigoDocumentoSector, codigoEmision, codigoModalidad, cufd, tipoFacturaDocumento, cafc, cantidadFacturas, codigoEvento, ...restData} = data;
  const bodyFecha = {funcion: "sincronizarFechaHora", ...restData}
  const fecha = await syncApi.getsync(bodyFecha);
  
  const hashCode = helpers.getHashCode(targz_path);
  const buff = fs.readFileSync(targz_path);
  const base64data = buff.toString('base64');

  const {token, ...soapData} = data;
  const facturaData = {archivo: base64data, fechaEnvio: fecha, hashArchivo: hashCode};
  const args = {SolicitudServicioRecepcionPaquete: {...soapData, ...facturaData}};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.recepcionPaqueteFacturaAsync(args);
  const result = Object.values(response[0])[0];
  const send = {...result, ...facturaData}
  console.log(send)
  return send;
};

const createpaquete = async (data) => {

  const files_path = path.join(__dirname, "../public/files/paquetedos");
  //const targz_path = path.join(__dirname, "../public/files/paquetedos/paquete.tar.gz");

  const {codigoDocumentoSector, codigoEmision, codigoModalidad, tipoFacturaDocumento, nit, codigoSucursal, codigoPuntoVenta, cantidadFacturas, codigoEvento, cafc} = data;
  var numero = await RecepcionRepo.getNumeroFactura();
  const {motivo_evento, fecha_inicio, cufd_evento} = await OperacionesRepo.getEventobyCodigo(codigoEvento);
  fecha_inicio.setSeconds(fecha_inicio.getSeconds()+1);
  const ccontrol = await CodigosRepo.getCControlbyCUFD(cufd_evento);
  const files_names = [];
  var cafc_line = '';
  
  if (motivo_evento >= 5){
    cafc_line = `<cafc>${cafc}</cafc>`
  } else {
    cafc_line = '<cafc xsi:nil="true"/>'
  }

  for (var i = 1; i <= cantidadFacturas; i++) {
    //const fecha = helpers.dateToTimestamp(date);
    const xml_path = path.join(__dirname, `../public/files/paquetedos/factura_${i}.xml`);
    const cuf = helpers.getCUF(nit, fecha_inicio, codigoSucursal, codigoModalidad, codigoEmision, tipoFacturaDocumento, codigoDocumentoSector, numero.toString(), codigoPuntoVenta, ccontrol);
    const xml = createXML(fecha_inicio.toISOString(), cufd_evento, cuf, numero, codigoPuntoVenta, cafc_line);
    fs.writeFileSync(xml_path, xml);
    await RecepcionRepo.addFactura({cuf, numero, fechaEnvio: fecha_inicio});
    fecha_inicio.setSeconds(fecha_inicio.getSeconds()+1);
    numero += 1;
    files_names.push(`factura_${i}.xml`);
  }

  //for (var i = 3; i <= 138; i+=2) {
    tar.c(
      {
        gzip: true,
        file: path.join(__dirname, `../public/files/paquetedos/paquete.tar.gz`),
        C: files_path
      },
      files_names
    ).then(() => {
      console.log( {status: 0, message: 'Tarball has been created'});
    });
  //}
};

const validatepaquete = async (data) => {

  const {cafc, cantidadFacturas, codigoEvento, token, ...restData} = data;
  const args = {SolicitudServicioValidacionRecepcionPaquete: {...restData}};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.validacionRecepcionPaqueteFacturaAsync(args);
  const result = Object.values(response[0])[0];
  console.log(result)
  //return result;
};

const anularfactura = async (data) => {

  var {token, ...restData} = data;
  const args = {SolicitudServicioAnulacionFactura: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.anulacionFacturaAsync(args);
  const result = Object.values(response[0])[0];
  console.log(result);
  return result;
  
};

module.exports = {
    addfactura,
    addpaquete,
    createpaquete,
    validatepaquete,
    anularfactura
}
