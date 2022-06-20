const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones?wsdl';
const helpers = require("../lib/helpers")

const addevento = async (data) => {
  var {token, fechaHoraInicioEvento, fechaHoraFinEvento, ...restData} = data;
  fechaHoraInicioEvento = helpers.dateToTimestamp(fechaHoraInicioEvento);
  fechaHoraFinEvento = helpers.dateToTimestamp(fechaHoraFinEvento);
  //console.log(fechaHoraFinEvento, fechaHoraInicioEvento)
  const args = {SolicitudEventoSignificativo: {...restData, fechaHoraInicioEvento, fechaHoraFinEvento}};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.registroEventoSignificativoAsync(args);
  const result = Object.values(response[0])[0];
  console.log(result);
  return result;
};

module.exports = {
  addevento
}