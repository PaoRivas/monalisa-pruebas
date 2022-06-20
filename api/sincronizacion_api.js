const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion?wsdl';

const getsync = async (data) => {
  const {funcion, token, ...restData} = data;
  const args = {SolicitudSincronizacion: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client[funcion + 'Async'](args);
  const firstkey = Object.values(response[0])[0];
  const result = Object.values(firstkey)[1];
  //console.log(result)
  return result;
};

module.exports = {
  getsync
}