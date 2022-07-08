var express = require("express");
var app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const session = require('express-session');
const codigosApi = require('./api/codigos_api');
const CodigosRepo = require('./db/codigos.repo');
const operacionesApi = require('./api/operaciones_api');
const OperacionesRepo = require('./db/operaciones.repo');
const syncApi = require('./api/sincronizacion_api');
const SyncRepo = require('./db/sincronizacion.repo');
const recepcionApi = require('./api/recepcion_api');
const RecepcionRepo = require('./db/recepcion.repo');
// const eventosApi = require("./api/eventos_api");
// const EventosRepo = require('./db/eventos.repo');
const { getFunctions } = require('./clientsoap');

//create a server object:
app.set('view engine', 'ejs')
app.set("layout extractScripts", true)

app.use(session({
  secret: 'mssqlnodesession',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(expressLayouts);

//global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message')[0];
  next();
});

app.get("/", function(req, res) {
  res.redirect("/cuis");
});

app.get("/cuis", async function(req, res) {
  const puntos = await OperacionesRepo.getPuntoVenta();
  res.render("cuis", {puntos});
});

app.post('/cuis', async function(req, res) {
    const xmlResult = await codigosApi.getcuis(req.body);
    await CodigosRepo.addCuis(req.body, xmlResult);
    res.json(xmlResult);
});

app.get("/cufd", async function(req, res) {
  const puntos = await OperacionesRepo.getPuntoVenta();
  res.render("cufd", {puntos});
});

app.post('/cufd', async function(req, res) {
  //for (var i = 0; i < 100; i++) {
    try{
    const xmlResult = await codigosApi.getcufd(req.body);
    await CodigosRepo.addCufd(req.body, xmlResult);
    //console.log(i)
  //}
  res.json(xmlResult);
    }catch (e) {
      console.log(e + "aquiiii")
    }
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
  const puntos = await OperacionesRepo.getPuntoVenta();
  const functions = await getFunctions();
  res.render("sincronizacion", {functions, puntos});
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
  const puntos = await OperacionesRepo.getPuntoVenta();
  res.render("recepcionfactura", {puntos});
});

app.post('/recepcionfactura', async function(req, res) {
  //for (var i = 0; i < 125; i++) {
    const xmlResult = await recepcionApi.addfactura(req.body);
    await RecepcionRepo.addRecepcionFactura(req.body, xmlResult);
    await RecepcionRepo.addFactura(xmlResult);
  //}
  res.redirect("/recepcionfactura");
});

app.get("/eventosignificativos", async function(req, res) {
  res.render("eventosignificativos");
});

app.post("/eventosignificativos", async function(req, res) {
  //const date = new Date("2022-05-19T11:40:00.000");
  //for (var i = 0; i < 5; i++) {
    // const fechaHoraInicioEvento = date.toISOString().replace('Z','');
    // date.setMinutes(date.getMinutes()+3)
    // const fechaHoraFinEvento = date.toISOString().replace('Z','');
    const {codigoMotivoEvento} = req.body;
    const descripcion = await SyncRepo.getNameEventoSignificativo(codigoMotivoEvento);
    const body = {...req.body, ...descripcion};
    //console.log(body);
    const xmlResult = await operacionesApi.addevento(body);
    await OperacionesRepo.addEvento(body, xmlResult)
    //date.setMinutes(date.getMinutes()+1)
  //}
  res.redirect("/eventosignificativos");
});

app.get("/recepcionpaquete", async function(req, res) {
  res.render("recepcionpaquete");
});

app.post("/recepcionpaquete", async function(req, res) {
  await recepcionApi.createpaquete(req.body);
  //const codigos = await RecepcionRepo.getCodigoRecepcionPaquete(); 
  //for (var i = 0; i < 200; i++) {
    const xmlResult = await recepcionApi.addpaquete(req.body);
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
  res.render("anulacion");
});

app.post("/anulacion", async function(req, res) {
  //console.log(req.body)
  //const cufs = await RecepcionRepo.getCuf();
  //for (var i = 1; i < 125; i++) {
    //const body = {...req.body, ...cufs[0]};
    const xmlResult = await recepcionApi.anularfactura(req.body);
    await RecepcionRepo.addAnulacion(req.body, xmlResult);
  //}
  res.redirect("/anulacion");
});

app.get("/data/:id", async function(req, res) {
  const {id} = req.params;
  const cuis = await CodigosRepo.getCuis(id);
  const cufd = await CodigosRepo.getLastCufd(id);
  res.json({cuis, cufd})
})

app.get("/pruebas", async function(req, res) {
  res.render("pruebas");
});
app.get("/tabla", async function(req, res) {
  res.render("tabla");
});

app.listen(process.env.PORT || 8080, process.env.IP, function() {
  console.log("Server is listening on http://localhost:8080");
});