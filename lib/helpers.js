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

module.exports = helpers;