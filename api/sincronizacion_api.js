// var request = require("request");
// var DOMParser = require("xmldom").DOMParser;
const { getClient } = require('../clientsoap');
const url = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion?wsdl';

const getsync = async (data) => {
  const {funcion, token, ...restData} = data;
  const args = {SolicitudSincronizacion: restData};
  const client = await getClient(url);
  client.addHttpHeader('ApiKey', `TokenApi ${token}`);
  const response = await client[funcion + 'Async'](args);
  const firstkey = Object.values(response[0])[0];
  const result = Object.values(firstkey)[1]
  console.log(result)
  return result;
};

module.exports = {
  getsync
}

// const syncActivities = (datos) => {
//   const {ambiente, sucursal, pventa, codsistema, cuis, token, nit} = datos;
//   xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:siat="https://siat.impuestos.gob.bo/">
//   <soapenv:Header/>
//   <soapenv:Body>
//      <siat:sincronizarActividades>
//         <SolicitudSincronizacion>
//            <codigoAmbiente>${ambiente}</codigoAmbiente>
//            <!--Optional:-->
//            <codigoPuntoVenta>${pventa}</codigoPuntoVenta>
//            <codigoSistema>${codsistema}</codigoSistema>
//            <codigoSucursal>${sucursal}</codigoSucursal>
//            <cuis>${cuis}</cuis>
//            <nit>${nit}</nit>
//         </SolicitudSincronizacion>
//      </siat:sincronizarActividades>
//   </soapenv:Body>
// </soapenv:Envelope>`;

//   options = {
//     method: "POST",
//     url: "https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion?wsdl",
//     headers: {
//       'Content-Type': 'text/xml',
//       'ApiKey' : `TokenApi ${token}`
//     },
//     body: xml
//   };
//   return new Promise((resolve, reject) => {
//     request(options, function(error, response) {
//       if (error) {
//         reject(new Error(error)); // reject instead of throwing, handle with `catch`
//         return;
//       }
//       text = response.body;
//       parser = new DOMParser();
//       console.log(text)
//       xmlDoc = parser.parseFromString(text, "text/xml");
//       caeb = xmlDoc.getElementsByTagName("codigoCaeb")[0].childNodes[0].nodeValue;
//       descripcion = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
//       tipo = xmlDoc.getElementsByTagName("tipoActividad")[0].childNodes[0].nodeValue;
//       xmlResult = {caeb, descripcion, tipo};
//       resolve(xmlResult);
//     });
//   });
// };