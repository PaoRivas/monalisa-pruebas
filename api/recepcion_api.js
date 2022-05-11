const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta?wsdl';

const sendFacturas = async () => {
//   const {token, ...restData} = data;
//   const args = {SolicitudServicioRecepcionFactura: restData};
  const client = await getClient(url);
//   client.addHttpHeader('ApiKey', `TokenApi ${token}`);
//   const response = await client.recepcionFacturaAsync(args);
//   const firstkey = Object.values(response[0])[0];
//   const result = Object.values(firstkey)[1]
  console.log(client.describe().ServicioFacturacion.ServicioFacturacionPort.recepcionFactura)
 // return result;
};

module.exports = {
    sendFacturas
}
