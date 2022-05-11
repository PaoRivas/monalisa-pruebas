const soap = require('soap');
const syncurl = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion?wsdl';

const getClient = async (url) => {
    try {
        const client = await soap.createClientAsync(url);
        return client;
    } catch (error) {
        console.error(error);
    }
};

const getFunctions = async () => {
    try {
        const client = await getClient(syncurl);
        const describe = client.describe();
        const port = describe.ServicioFacturacionSincronizacion.ServicioFacturacionSincronizacionPort;
        const functions = Object.keys(port);
        functions.splice(10,1);
        return functions;
    } catch (error) {
        console.error(error);
    }
};
  
module.exports = {
    getClient,
    getFunctions
};

//   var args = {SolicitudSincronizacion: {codigoAmbiente: '2', codigoPuntoVenta: '0', codigoSistema: '71F2C7048ED54B99A4AE42F', codigoSucursal: '0', cuis: '145110CC', nit: '190590027'}};
// soap.createClient(url, function(err, client) {
//   // client.addHttpHeader('ApiKey', `TokenApi eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGdvcml0bW9zIiwiY29kaWdvU2lzdGVtYSI6IjcxRjJDNzA0OEVENTRCOTlBNEFFNDJGIiwibml0IjoiSDRzSUFBQUFBQUFBQURPME5EQzFOREF3TWdjQW5ZMnBsQWtBQUFBPSIsImlkIjoxMTI4MzcsImV4cCI6MTY4MDgyNTYwMCwiaWF0IjoxNjQ5NDUwMzk1LCJuaXREZWxlZ2FkbyI6MTkwNTkwMDI3LCJzdWJzaXN0ZW1hIjoiU0ZFIn0.4iS_yuqltwVDc-mHZ128d46f31F82gDzPUwd4DtFz0OTleTKleF_5ErBrhgTEStOiHaaCX2F5dlcLYoQBOkemA`);
//   // client.sincronizarActividades(args, function(err, result) {
//   //   console.log(result.RespuestaListaActividades.listaActividades[0]);
//   // });
//   console.log(Object.keys(client.describe().ServicioFacturacionSincronizacion.ServicioFacturacionSincronizacionPort));
//   //console.log(client.describe())
// });