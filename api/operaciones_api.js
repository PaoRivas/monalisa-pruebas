const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones?wsdl';
const helpers = require('../lib/helpers');

const addpventa = async (data) => {
  const {token, ...restData} = data;
  const args = {SolicitudRegistroPuntoVenta: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.registroPuntoVentaAsync(args);
  const result = Object.values(response[0])[0];
  //console.log(client.describe().ServicioFacturacionOperaciones.ServicioFacturacionOperacionesPort.registroPuntoVenta);
  //console.log(result)
  return result;
};

const addevento = async (data) => {
  var {token, fechaHoraInicioEvento, fechaHoraFinEvento, ...restData} = data;
  console.log(new Date(fechaHoraInicioEvento), new Date(fechaHoraFinEvento));
  // fechaHoraInicioEvento = helpers.dateToTimestamp(fechaHoraInicioEvento);
  // fechaHoraFinEvento = helpers.dateToTimestamp(fechaHoraFinEvento);
  fechaHoraInicioEvento = new Date(fechaHoraInicioEvento).toISOString();
  fechaHoraFinEvento = new Date(fechaHoraFinEvento).toISOString();
  const args = {SolicitudEventoSignificativo: {...restData, fechaHoraInicioEvento, fechaHoraFinEvento}};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client.registroEventoSignificativoAsync(args);
  const result = Object.values(response[0])[0];
  console.log(result);
  return result;
};

module.exports = {
  addpventa,
  addevento
}
