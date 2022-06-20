const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones?wsdl';

const addpventa = async (data) => {
  const {token, ...restData} = data;
  const args = {SolicitudRegistroPuntoVenta: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.registroPuntoVentaAsync(args);
  const result = Object.values(response[0])[0];
  //console.log(client.describe().ServicioFacturacionOperaciones.ServicioFacturacionOperacionesPort.registroPuntoVenta);
  return result;
};

module.exports = {
  addpventa
}
