var request = require("request");
var DOMParser = require("xmldom").DOMParser;

const addpventa = (datos) => {
  const {ambiente, modalidad, sucursal, tipo, codsistema, cuis, nombre, descripcion, token, nit} = datos;
  xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:siat="https://siat.impuestos.gob.bo/">
  <soapenv:Header/>
  <soapenv:Body>
     <siat:registroPuntoVenta>
        <SolicitudRegistroPuntoVenta>
           <codigoAmbiente>${ambiente}</codigoAmbiente>
           <codigoModalidad>${modalidad}</codigoModalidad>
           <codigoSistema>${codsistema}</codigoSistema>
           <codigoSucursal>${sucursal}</codigoSucursal>
           <codigoTipoPuntoVenta>${tipo}</codigoTipoPuntoVenta>
           <cuis>${cuis}</cuis>
           <descripcion>${descripcion}</descripcion>
           <nit>${nit}</nit>
           <nombrePuntoVenta>${nombre}</nombrePuntoVenta>
        </SolicitudRegistroPuntoVenta>
     </siat:registroPuntoVenta>
  </soapenv:Body>
</soapenv:Envelope>`;

  options = {
    method: "POST",
    url: "https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones?wsdl",
    headers: {
      'Content-Type': 'text/xml',
      'ApiKey' : `TokenApi ${token}`
    },
    body: xml
  };
  return new Promise((resolve, reject) => {
    request(options, function(error, response) {
      if (error) {
        reject(new Error(error)); // reject instead of throwing, handle with `catch`
        return;
      }
      text = response.body;
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
      codigo = xmlDoc.getElementsByTagName("codigoPuntoVenta")[0].childNodes[0].nodeValue;
      trans = xmlDoc.getElementsByTagName("transaccion")[0].childNodes[0].nodeValue;
      xmlResult = {codigo, trans};
      resolve(xmlResult);
    });
  });
};

module.exports = {
  addpventa
}
