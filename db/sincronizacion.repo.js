const { getConnection, mssql } = require('../database');
const { getFunctions } = require('../clientsoap')
const helpers = require('../lib/helpers')

class SyncRepo {

  static async chooseSync(form, xmlresponse) {
    try {
      const { funcion } = form;
      switch(funcion){
        case 'sincronizarActividades':
          await this.getSyncActivities(form, xmlresponse);
          break;
        case 'sincronizarFechaHora':
          await this.getSyncDateTime(form, xmlresponse);
          break;
        case 'sincronizarListaActividadesDocumentoSector':
          await this.getSyncListaActividades(form, xmlresponse);
          break;
        case 'sincronizarListaLeyendasFactura':
          await this.getSyncListaLeyendas(form, xmlresponse);
          break;
        case 'sincronizarListaProductosServicios':
          await this.getSyncListaProductos(form,xmlresponse);
          break;
        default:
          console.log('aqui dos')
          await this.getSyncRest(form, xmlresponse)
          break;
      }
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getSyncActivities(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoSucursal, codigoPuntoVenta, cuis} = form;
        const {codigoCaeb, descripcion, tipoActividad} = xmlresponse[0];
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('cuis',  mssql.VarChar(10), cuis);
        request.input('descripcion',  mssql.VarChar(100), descripcion);
        request.input('codigo',  mssql.VarChar(100), codigoCaeb);
        request.input('tipo',  mssql.VarChar(100), tipoActividad);
        await request.query(
          `INSERT INTO [dbo].[sinc_actividades]
          ([ambiente],[sucursal],[pventa],[cuis],[codigo_caeb],[descripcion],[tipo_actividad])
          VALUES
          (@ambiente,@sucursal,@pventa,@cuis,@codigo,@descripcion,@tipo)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getSyncDateTime(form, xmlresponse) {
    try {
      const {codigoAmbiente, codigoSucursal, codigoPuntoVenta, cuis} = form;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('cuis',  mssql.VarChar(10), cuis);
        request.input('fecha',  mssql.DateTime, new Date(xmlresponse));
        await request.query(
          `INSERT INTO [dbo].[sinc_fecha_hora]
          ([ambiente],[sucursal],[pventa],[cuis],[fecha_hora])
          VALUES
          (@ambiente,@sucursal,@pventa,@cuis,@fecha)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getSyncListaActividades(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoSucursal, codigoPuntoVenta, cuis} = form;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('cuis',  mssql.VarChar(10), cuis);

        xmlresponse.forEach(async (res, i) => {

          request.input(`cactividad${i}`,  mssql.VarChar(100), res.codigoActividad);
          request.input(`cdocumento${i}`,  mssql.Int, res.codigoDocumentoSector);
          request.input(`tipo${i}`,  mssql.VarChar(100), res.tipoDocumentoSector);
          await request.query(
          `INSERT INTO [dbo].[sinc_lista_actividades]
          ([ambiente],[sucursal],[pventa],[cuis],[codigo_actividad],[codigo_documento],[tipo_documento])
          VALUES
          (@ambiente,@sucursal,@pventa,@cuis,@cactividad${i},@cdocumento${i},@tipo${i})`
          )

        })
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getSyncListaLeyendas(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoSucursal, codigoPuntoVenta, cuis} = form;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('cuis',  mssql.VarChar(10), cuis);

        xmlresponse.forEach(async (res, i) => {

          request.input(`descripcion${i}`,  mssql.VarChar(200), res.descripcionLeyenda);
          request.input(`codigo${i}`,  mssql.VarChar(100), res.codigoActividad);
          await request.query(
            `INSERT INTO [dbo].[sinc_lista_leyendas]
            ([ambiente],[sucursal],[pventa],[cuis],[codigo_actividad],[descripcion])
            VALUES
            (@ambiente,@sucursal,@pventa,@cuis,@codigo${i},@descripcion${i})`
          )

        })
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getSyncListaProductos(form, xmlresponse) {
    try {
      const {codigoAmbiente, codigoSucursal, codigoPuntoVenta, cuis} = form;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('cuis',  mssql.VarChar(10), cuis);

        xmlresponse.forEach(async (res, i) => {

          request.input(`cactividad${i}`,  mssql.VarChar(100), res.codigoActividad);
          request.input(`cproducto${i}`,  mssql.Int, res.codigoProducto);
          request.input(`descripcion${i}`,  mssql.VarChar(100), res.descripcionProducto);
          await request.query(
            `INSERT INTO [dbo].[sinc_lista_productos]
            ([ambiente],[sucursal],[pventa],[cuis],[codigo_actividad],[codigo_producto],[descripcion])
            VALUES
            (@ambiente,@sucursal,@pventa,@cuis,@cactividad${i},@cproducto${i},@descripcion${i})`
          )

        })
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getSyncRest(form, xmlresponse) {
    try {
      
      const {codigoAmbiente, codigoSucursal, codigoPuntoVenta, cuis, funcion} = form;
      const table = helpers.functionToTable(funcion);
      const pool = await getConnection();
      const request = await pool.request();
      request.input('ambiente',  mssql.Int, codigoAmbiente);
      request.input('sucursal',  mssql.Int, codigoSucursal);
      request.input('pventa',  mssql.Int, codigoPuntoVenta);
      request.input('cuis',  mssql.VarChar(10), cuis);

      xmlresponse.forEach(async (res, i) => {

        request.input(`codigo${i}`,  mssql.Int, res.codigoClasificador);
        request.input(`descripcion${i}`,  mssql.VarChar(100), res.descripcion);
        await request.query(
        `INSERT INTO [dbo].[sinc_${table}] 
        ([ambiente],[sucursal],[pventa],[cuis],[codigo_clasificador],[descripcion])
        VALUES (@ambiente,@sucursal,@pventa,@cuis,@codigo${i},@descripcion${i})`
        )
        
      })
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = SyncRepo;