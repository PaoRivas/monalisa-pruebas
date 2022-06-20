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
const tar = require('tar');

const addfactura = async (data, i) => {

  const xml_path = path.join(__dirname, "../public/files/factura.xml");
  const gz_path = path.join(__dirname, "..", "public", "files", "factura.gz");
  const xsd_path = path.join(__dirname, "..", "public", "files", "facturaComputarizadaCompraVenta.xsd");

  const {codigoDocumentoSector, codigoEmision, codigoModalidad, cufd, tipoFacturaDocumento, ...restData} = data;
  const bodyFecha = {funcion: "sincronizarFechaHora", ...restData}
  const fecha = await syncApi.getsync(bodyFecha);

  const lastcufd = await CodigosRepo.getLastCufd(data.codigoPuntoVenta);
  const {nit, codigoSucursal, codigoPuntoVenta} = data;
  const cuf = helpers.getCUF(nit, fecha, codigoSucursal, codigoModalidad, codigoEmision, tipoFacturaDocumento, codigoDocumentoSector, i, codigoPuntoVenta, lastcufd.codigo_control);

  const xml = createXML(fecha, cufd, cuf, i, codigoPuntoVenta);
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
    const send = {...result, ...facturaData}
    return send;
  }  
};

const addpaquete = async (data, i) => {

  const targz_path = path.join(__dirname, `../public/files/paquetedos/paquete_${i}.tar.gz`);

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
  //console.log(send)
  return send;
};

const createpaquete = async (data) => {

  const files_path = path.join(__dirname, "../public/files/paquetedos");
  //const targz_path = path.join(__dirname, "../public/files/paquetedos/paquete.tar.gz");

  const {codigoDocumentoSector, codigoEmision, codigoModalidad, tipoFacturaDocumento, nit, codigoSucursal, codigoPuntoVenta} = data;
  //const bodyFecha = {funcion: "sincronizarFechaHora", ...restData}
  const date = new Date("2022-06-13T19:10:00.000")
  
  //const lastcufd = await CodigosRepo.getLastCufd(data.codigoPuntoVenta);
  //const {nit, codigoSucursal, codigoPuntoVenta} = data;
  
  for (var i = 139; i <= 140; i++) {
    const fecha = helpers.dateToTimestamp(date);
    const xml_path = path.join(__dirname, `../public/files/paquetedos/factura_${i}.xml`);
    const cuf = helpers.getCUF(nit, fecha, codigoSucursal, codigoModalidad, codigoEmision, tipoFacturaDocumento, codigoDocumentoSector, i.toString(), codigoPuntoVenta, '1BB2BE2E5A86D74');
    const xml = createXML(fecha, "BQcKhQ3xGVEFBNzEI5OUE0QUU0MkY=Q2VVR0VNT0dXVUJFGMkM3MDQ4RUQ1N", cuf, i, codigoPuntoVenta);
    fs.writeFileSync(xml_path, xml);
    date.setMinutes(date.getMinutes()+1);
  }

  //for (var i = 3; i <= 138; i+=2) {
    tar.c(
      {
        gzip: true,
        file: path.join(__dirname, `../public/files/paquetedos/paquete_139.tar.gz`),
        C: files_path
      },
      [`factura_139.xml`, `factura_140.xml`]
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
  console.log(result.codigoDescripcion)
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
