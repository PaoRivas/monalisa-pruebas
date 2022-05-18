const libxmljs = require('libxmljs');
const fs = require('fs');
const crypto = require('crypto');

const helpers = {};

helpers.functionToTable = (funcion) => {
    const removeSinc = funcion.slice(11);
    if (removeSinc.startsWith("P")){
        const removePar = removeSinc.slice(11);
        const name = removePar.replace(/([a-z])([A-Z])/g, '$1_$2');
        return name.toLowerCase();
    }
    const name = removeSinc.replace(/([a-z])([A-Z])/g, '$1_$2');
    return name.toLowerCase();
}

helpers.validationXmlXsd = (xml_path, xsd_path) => {
    const xml = fs.readFileSync(xml_path, 'utf8');
    const xmlDoc = libxmljs.parseXmlString(xml);
    const xsd = fs.readFileSync(xsd_path, 'utf8');
    const xsdDoc = libxmljs.parseXmlString(xsd);
    const result = xmlDoc.validate(xsdDoc);
    return result;
}

helpers.getHashCode = (gz_path) => {
    const fileBuffer = fs.readFileSync(gz_path);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hashCode = hashSum.digest('hex');
    return hashCode;
}

helpers.completeZeros = (string, longitud) => {
    while (string.length < longitud){
        string = 0 + string
    }
    return string;
}

helpers.dateToString = (fecha) => {

    const d = new Date(fecha);
    const yyyy = d.getFullYear();
    const MM = (d.getMonth() + 1).toString();
    const dd = d.getDate().toString();
    const HH = d.getHours().toString();
    const mm = d.getMinutes().toString();
    const ss = d.getSeconds().toString();
    const SSS = d.getMilliseconds().toString();

    return [yyyy, 
        helpers.completeZeros(MM, 2), 
        helpers.completeZeros(dd, 2),
        helpers.completeZeros(HH, 2), 
        helpers.completeZeros(mm, 2),
        helpers.completeZeros(ss, 2),
        helpers.completeZeros(SSS, 3)].join('');

}

helpers.calculaDigitoMod11 = (cadena, numDig = 1, limMult = 9, x10 = false) =>{
    if (!x10) numDig = 1;

    for(n = 1; n <= numDig; n++) {
        var suma = 0;
        var mult = 2;
        for(i = cadena.length - 1; i >= 0; i--) {
            suma += (mult * parseInt(cadena.substring(i, i + 1)));
            if(++mult > limMult) mult = 2;
        }
        if (x10) {
            dig = ((suma * 10) % 11) % 10;
        }else {
            dig = suma % 11;
        }                   
        if (dig == 10) {
            cadena += 1;
        }
        if (dig == 11) {
            cadena += 0;
        }
        if (dig < 10) {
            cadena += dig;
        }     
    }
        return cadena;
}

helpers.getCUF = (nit, fecha, sucursal, modalidad, emision, tipo, sector, numero, pos, ccontrol) => {

    nit = helpers.completeZeros(nit, 13);
    fecha = helpers.dateToString(fecha);
    sucursal = helpers.completeZeros(sucursal, 4);
    sector = helpers.completeZeros(sector, 2);
    numero = helpers.completeZeros(numero, 10);
    pos = helpers.completeZeros(pos, 4);

    const cadena = [nit, fecha, sucursal, modalidad, emision, tipo, sector, numero, pos].join('');
    const cadenamod11 = helpers.calculaDigitoMod11(cadena);
    const base16data = BigInt(cadenamod11).toString('16');
    const cuf = base16data.toUpperCase() + ccontrol
    return cuf;
    
}

module.exports = helpers; 
