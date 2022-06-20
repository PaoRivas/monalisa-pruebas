var express = require("express");
var app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const codigosApi = require('./api/codigos_api');
const CodigosRepo = require('./db/codigos.repo');
const operacionesApi = require('./api/operaciones_api');
const OperacionesRepo = require('./db/operaciones.repo');
const syncApi = require('./api/sincronizacion_api');
const SyncRepo = require('./db/sincronizacion.repo');
const recepcionApi = require('./api/recepcion_api');
const RecepcionRepo = require('./db/recepcion.repo');
const eventosApi = require("./api/eventos_api");
const EventosRepo = require('./db/eventos.repo');
const { getFunctions } = require('./clientsoap');

//create a server object:
app.set('view engine', 'ejs')
app.set("layout extractScripts", true)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(expressLayouts);

app.get("/", function(req, res) {
  res.redirect("/cuis");
});

app.get("/cuis", function(req, res) {
  res.render("cuis");
});

app.post('/cuis', async function(req, res) {
  const xmlResult = await codigosApi.getcuis(req.body);
  await CodigosRepo.addCuis(req.body, xmlResult);
  res.json(xmlResult);
});

app.get("/cufd", function(req, res) {
  res.render("cufd");
});

app.post('/cufd', async function(req, res) {
  //for (var i = 0; i < 100; i++) {
    const xmlResult = await codigosApi.getcufd(req.body);
    await CodigosRepo.addCufd(req.body, xmlResult);
    //console.log(i)
  //}
  res.json(xmlResult);
});

app.get("/puntoventa", function(req, res) {
  res.render("crearpventa");
});

app.post('/puntoventa', async function(req, res) {
  const xmlResult = await operacionesApi.addpventa(req.body);
  await OperacionesRepo.addPuntoVenta(req.body, xmlResult);
  res.json(xmlResult);
});

app.get("/sincronizacion", async function(req, res) {
  const functions = await getFunctions();
  res.render("sincronizacion", {functions});
});

app.post('/sincronizacion', async function(req, res) {
  //for (var i = 0; i < 50; i++) {
    const xmlResult = await syncApi.getsync(req.body);
    SyncRepo.chooseSync(req.body, xmlResult);
    //console.log(i)
  //}
  res.redirect("/sincronizacion");
});

app.get("/recepcionfactura", async function(req, res) {
  const lastcufd = await CodigosRepo.getLastCufd(0);
  res.render("recepcionfactura", {lastcufd});
});

app.post('/recepcionfactura', async function(req, res) {
  for (var i = 2; i < 126; i++) {
    const xmlResult = await recepcionApi.addfactura(req.body, 1);
    await RecepcionRepo.addFactura(req.body, xmlResult);
    await RecepcionRepo.addCuf(xmlResult);
  }
  res.redirect("/recepcionfactura");

});

app.get("/eventosignificativos", async function(req, res) {
  const lastcufd = await CodigosRepo.getLastCufd(1);
  res.render("eventosignificativos", {lastcufd});
});

app.post("/eventosignificativos", async function(req, res) {
  //const date = new Date("2022-05-19T11:40:00.000");
  //for (var i = 0; i < 5; i++) {
    // const fechaHoraInicioEvento = date.toISOString().replace('Z','');
    // date.setMinutes(date.getMinutes()+3)
    // const fechaHoraFinEvento = date.toISOString().replace('Z','');
    const {codigoMotivoEvento} = req.body;
    const descripcion = await SyncRepo.getEventoSignificativo(codigoMotivoEvento);
    const body = {...req.body, ...descripcion};
    //console.log(body);
    const xmlResult = await eventosApi.addevento(body);
    await EventosRepo.addEvento(body, xmlResult)
    //date.setMinutes(date.getMinutes()+1)
  //}
  res.redirect("/eventosignificativos");
});

app.get("/recepcionpaquete", async function(req, res) {
  const lastcufd = await CodigosRepo.getLastCufd(1);
  res.render("recepcionpaquete", {lastcufd});
});

app.post("/recepcionpaquete", async function(req, res) {
  await recepcionApi.createpaquete(req.body);
  //const codigos = await RecepcionRepo.getCodigoRecepcionPaquete(); 
  //for (var i = 0; i < 200; i++) {
    const xmlResult = await recepcionApi.addpaquete(req.body, 139);
    await RecepcionRepo.addPaquete(req.body, xmlResult);
    const {codigoRecepcion} = xmlResult;
    //console.log(codigos);
    //const codigoRecepcion = codigos[i].codigo_recepcion;
    const body = {...req.body, codigoRecepcion}
    await recepcionApi.validatepaquete(body);
  //}
  res.redirect("/recepcionpaquete");
});

app.get("/anulacion", async function(req, res) {
  const lastcufd = await CodigosRepo.getLastCufd(0);
  res.render("anulacion", {lastcufd});
});

app.post("/anulacion", async function(req, res) {
  //console.log(req.body)
  const cufs = await RecepcionRepo.getCuf();
  //for (var i = 1; i < 125; i++) {
    const body = {...req.body, ...cufs[0]};
    const xmlResult = await recepcionApi.anularfactura(body);
    await RecepcionRepo.addAnulacion(body, xmlResult);
  //}
  res.redirect("/anulacion");
});

app.get("/pruebas", async function(req, res) {
  res.render("pruebas");
});
app.get("/tabla", async function(req, res) {
  res.render("tabla");
});

app.listen(process.env.PORT || 8080, process.env.IP, function() {
  console.log("Server is listening on http://localhost:8080");
});