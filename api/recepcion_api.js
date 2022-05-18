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

const sendFacturas = async (data) => {

  const xml_path = path.join(__dirname, "../public/files/factura.xml");
  const gz_path = path.join(__dirname, "..", "public", "files", "factura.gz");
  const xsd_path = path.join(__dirname, "..", "public", "files", "facturaComputarizadaCompraVenta.xsd");

  const {codigoDocumentoSector, codigoEmision, codigoModalidad, cufd, tipoFacturaDocumento, ...restData} = data;
  const bodyFecha = {funcion: "sincronizarFechaHora", ...restData}
  const fecha = await syncApi.getsync(bodyFecha);

  const lastcufd = await CodigosRepo.getLastCufd(data.codigoPuntoVenta);
  const {nit, codigoSucursal, codigoPuntoVenta} = data;
  const cuf = helpers.getCUF(nit, fecha, codigoSucursal, codigoModalidad, codigoEmision, tipoFacturaDocumento, codigoDocumentoSector, "1", codigoPuntoVenta, lastcufd.codigo_control);

  const xml = createXML(fecha, cufd, cuf);
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

module.exports = {
    sendFacturas
}
