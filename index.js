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

app.post('/cuis', function(req, res) {
  // try{
  //   const xmlResult = await api.query(req.query);
  //   await CuisRepo.postCuis(req.query, xmlResult);
  //   res.render('index', {data: xmlResult});
  // }catch{
  //   res.status(500).send(ex);
  // }
  codigosApi.getcuis(req.body)
    .then(xmlResult => {
      CodigosRepo.addCuis(req.body, xmlResult);
      res.json({data: xmlResult});
    })
});

app.get("/cufd", function(req, res) {
  res.render("cufd");
});

app.post('/cufd', async function(req, res) {

//   for (var i = 0, p = Promise.resolve(); i < 100; i++) {

//     p = p.then(() => codigosApi.getcufd(req.body))
//     .then(xmlResult => {
//       console.log(i)
//       CodigosRepo.addCufd(req.body, xmlResult);
//     })
//     //res.json({data: xmlResult})
//     console.log(i+"hh")
//  }
  //for (var i = 0; i < 100; i++) {
    const xmlResult = await codigosApi.getcufd(req.body);
    await CodigosRepo.addCufd(req.body, xmlResult);
    //console.log(i)
  //}
  res.json({data: xmlResult});
});

app.get("/crearpventa", function(req, res) {
  res.render("crearpventa");
});

app.post('/crearpventa', function(req, res) {
  operacionesApi.addpventa(req.body)
  .then(xmlResult => {
    OperacionesRepo.addPventa(req.body, xmlResult);
    res.json({data: xmlResult})
    //res.render("pventa");
  })
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
  res.render("recepcionfactura");
});

app.post('/recepcionfactura', async function(req, res) {

  await recepcionApi.sendFacturas();
  res.redirect("/recepcionfactura");

});

app.get("/eventosignificativos", async function(req, res) {
  res.render("eventosignificativos");
});

// app.get("/sincronizacion", async function(req, res) {
//   const functions = await getFunctions();
//   res.render("sincronizacion", {functions});
// });

// app.get("/sincronizacion", async function(req, res) {
//   const functions = await getFunctions();
//   res.render("sincronizacion", {functions});
// });

app.listen(process.env.PORT || 8080, process.env.IP, function() {
  console.log("Server is listening on http://localhost:8080");
});