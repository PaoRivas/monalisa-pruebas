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
//const trans = document.getElementById("trans")
//const btnCuis = document.getElementById("btncuis")

const responseCuis = async () => {
    const formData = new FormData(formCodes);
    const data = await fetch('/cuis', {
      method: "POST",
      body: formData
    });
    const response = await data.json();
    cuis.value = response.data.codigo
    utc.value = response.data.utc
    amd.value = response.data.amd
    //trans.value = response.data.trans
};

const responseCufd = async () => {
    const formData = new FormData(formCodes);
    const data = await fetch('/cufd', {
      method: "POST",
      body: formData
    });
    const response = await data.json();
    cufd.value = response.data.codigo
    ccontrol.value = response.data.ccontrol
    direccion.value = response.data.direccion
    utc.value = response.data.utc
    amd.value = response.data.amd
    //trans.value = response.data.trans
};

const responseCpventa = async () => {
  const formData = new FormData(formCodes);
  const data = await fetch('/crearpventa', {
    method: "POST",
    body: formData
  });
  const response = await data.json();
  cpventa.value = response.data.codigo
  //trans.value = response.data.trans
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
      responseCpventa();
    }
});