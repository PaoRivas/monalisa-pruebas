const formCodes = document.getElementById("formcodes");
const cuis = document.getElementById("cuis");
const utc = document.getElementById('utc');
const amd = document.getElementById('amd');
const cufd = document.getElementById("cufd");
const ccontrol = document.getElementById("ccontrol")
const direccion = document.getElementById("direccion")
const cpventa = document.getElementById("cpventa");
const caeb = document.getElementById("caeb")
const descripcion = document.getElementById("descripcion")
const tipo = document.getElementById("tipo");

const responseCuis = async () => {
    const formData = new FormData(formCodes);
    const response = await fetch('/cuis', {
      method: "POST",
      body: formData
    });
    const xmlResult = await response.json();
    cuis.value = xmlResult.codigo
    utc.value = xmlResult.fechaVigencia
    amd.value = xmlResult.fechaVigencia
};

const responseCufd = async () => {
    const formData = new FormData(formCodes);
    const response = await fetch('/cufd', {
      method: "POST",
      body: formData
    });
    const xmlResult = await response.json();
    cufd.value = xmlResult.codigo
    ccontrol.value = xmlResult.codigoControl
    direccion.value = xmlResult.direccion
    utc.value = xmlResult.fechaVigencia
    amd.value = xmlResult.fechaVigencia
};

const responsePuntoVenta = async () => {
  const formData = new FormData(formCodes);
  const response = await fetch('/puntoventa', {
    method: "POST",
    body: formData
  });
  const xmlResult = await response.json();
  cpventa.value = xmlResult.codigoPuntoVenta;
};

formCodes.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".btn-cuis")) { 
      e.preventDefault();
      responseCuis();
    }else if(e.target && e.target.matches(".btn-cufd")){
      e.preventDefault();
      responseCufd();
    }else if(e.target && e.target.matches(".btn-cpventa")){
      e.preventDefault();
      responsePuntoVenta();
    }
});