var request = require("request");
var DOMParser = require("xmldom").DOMParser;

const getcuis = (datos) => {
  const {ambiente, modalidad, sucursal, pventa, codsistema, token, nit} = datos;
  xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:siat="https://siat.impuestos.gob.bo/">
  <soapenv:Header/>
  <soapenv:Body>
     <siat:cuis>
        <SolicitudCuis>
           <codigoAmbiente>${ambiente}</codigoAmbiente>
           <codigoModalidad>${modalidad}</codigoModalidad>
           <!--Optional:-->
           <codigoPuntoVenta>${pventa}</codigoPuntoVenta>
           <codigoSistema>${codsistema}</codigoSistema>
           <codigoSucursal>${sucursal}</codigoSucursal>
           <nit>${nit}</nit>
        </SolicitudCuis>
     </siat:cuis>
  </soapenv:Body>
</soapenv:Envelope>`;

  options = {
    method: "POST",
    url: "https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos?wsdl",
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
      codigo = xmlDoc.getElementsByTagName("codigo")[0].childNodes[0].nodeValue;
      vigencia = new Date(xmlDoc.getElementsByTagName("fechaVigencia")[0].childNodes[0].nodeValue);
      utc = vigencia.toUTCString();
      amd = vigencia.toJSON().slice(0,10);
      cod_mensaje = xmlDoc.getElementsByTagName("codigo")[1].childNodes[0].nodeValue;
      mensaje = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
      trans = xmlDoc.getElementsByTagName("transaccion")[0].childNodes[0].nodeValue;
      xmlResult = {codigo, utc, amd, cod_mensaje, mensaje, trans};
      console.log(xmlResult)
      resolve(xmlResult);
    });
  });
};

const getcufd = (datos) => {
  const {ambiente, modalidad, sucursal, pventa, codsistema, cuis, token, nit} = datos;
  xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:siat="https://siat.impuestos.gob.bo/">
  <soapenv:Header/>
  <soapenv:Body>
     <siat:cufd>
        <SolicitudCufd>
           <codigoAmbiente>${ambiente}</codigoAmbiente>
           <codigoModalidad>${modalidad}</codigoModalidad>
           <!--Optional:-->
           <codigoPuntoVenta>${pventa}</codigoPuntoVenta>
           <codigoSistema>${codsistema}</codigoSistema>
           <codigoSucursal>${sucursal}</codigoSucursal>
           <cuis>${cuis}</cuis>
           <nit>${nit}</nit>
        </SolicitudCufd>
     </siat:cufd>
  </soapenv:Body>
</soapenv:Envelope>`;

  options = {
    method: "POST",
    url: "https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos?wsdl",
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
      codigo = xmlDoc.getElementsByTagName("codigo")[0].childNodes[0].nodeValue;
      ccontrol = xmlDoc.getElementsByTagName("codigoControl")[0].childNodes[0].nodeValue;
      direccion = xmlDoc.getElementsByTagName("direccion")[0].childNodes[0].nodeValue;
      vigencia = new Date(xmlDoc.getElementsByTagName("fechaVigencia")[0].childNodes[0].nodeValue);
      utc = vigencia.toUTCString();
      amd = vigencia.toJSON().slice(0,10);
      //cod_mensaje = xmlDoc.getElementsByTagName("codigo")[1].childNodes[0].nodeValue;
      //mensaje = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
      trans = xmlDoc.getElementsByTagName("transaccion")[0].childNodes[0].nodeValue;
      xmlResult = {codigo, ccontrol, direccion, utc, amd, trans};
      console.log(vigencia, utc, amd)
      resolve(xmlResult);
    });
  });
};

module.exports = {
  getcuis,
  getcufd
}
