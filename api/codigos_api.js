const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos?wsdl';
const helpers = require('../lib/helpers');

const getcuis = async (data) => {
  const {token, ...restData} = data;
  const args = {SolicitudCuis: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.cuisAsync(args);
  const result = Object.values(response[0])[0];
  result.fechaVigencia = helpers.dateToTimestamp(result.fechaVigencia);
  //console.log(client.describe().ServicioFacturacionCodigos.ServicioFacturacionCodigosPort.cuis);
  //  utc = helpers.dateToTimestamp(vigencia);
  //  amd = utc.slice(0,10);
  return result;
};

const getcufd = async (data) => {
  const {token, ...restData} = data;
  const args = {SolicitudCufd: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.cufdAsync(args);
  const result = Object.values(response[0])[0];
  result.fechaVigencia = helpers.dateToTimestamp(result.fechaVigencia);
  //console.log(client.describe().ServicioFacturacionCodigos.ServicioFacturacionCodigosPort.cuis);
  //  utc = helpers.dateToTimestamp(vigencia);
  //  amd = utc.slice(0,10);
  return result;
};

module.exports = {
  getcuis,
  getcufd
}
