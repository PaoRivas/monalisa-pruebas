const { getConnection, mssql } = require('../database');
const helpers = require('../lib/helpers');

class CodigosRepo {

  static async addCuis(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoModalidad, codigoSucursal, codigoPuntoVenta} = form;
        const {codigo, fechaVigencia, transaccion} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('modalidad',  mssql.Int, codigoModalidad);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('codigo',  mssql.VarChar(10), codigo);
        request.input('vigencia', mssql.DateTime, fechaVigencia);
        // request.input('cod_mensaje',  mssql.Int, 980);
        // request.input('mensaje',  mssql.VarChar(100), 'EXISTE UN CUIS VIGENTE PARA LA SUCURSAL O PUNTO DE VENTA');
        request.input('trans',  mssql.Bit, transaccion);
        await request.query(
          `INSERT INTO [dbo].[cuis]
          ([ambiente],[modalidad],[sucursal],[pventa],[codigo],[vigencia],[trans])
            VALUES
          (@ambiente, @modalidad, @sucursal, @pventa, @codigo, @vigencia, @trans)`
        );
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addCufd(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoModalidad, codigoSucursal, codigoPuntoVenta, cuis} = form;
        const {codigo, codigoControl, direccion, fechaVigencia, transaccion} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('modalidad',  mssql.Int, codigoModalidad);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('cuis',  mssql.VarChar(10), cuis);
        request.input('codigo',  mssql.VarChar(100), codigo);
        request.input('ccontrol',  mssql.VarChar(50), codigoControl);
        request.input('direccion',  mssql.VarChar(200), direccion);
        request.input('vigencia', mssql.DateTime, fechaVigencia);
        request.input('trans',  mssql.Bit, transaccion);
        await request.query(
          `INSERT INTO [dbo].[cufd] ([ambiente],[modalidad],[sucursal],[pventa],[cuis],[codigo],[codigo_control],[direccion],[vigencia],[trans])
          VALUES
          (@ambiente, @modalidad, @sucursal, @pventa, @cuis, @codigo, @ccontrol, @direccion, @vigencia, @trans)`
        );
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getCuis(pventa) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('pventa',  mssql.Int, pventa);
      const response = await request.query(`SELECT codigo FROM cuis WHERE pventa = @pventa`);
      var cuis = response.recordset[0];
      if (!cuis){
        cuis = {codigo: 'No existe CUIS'};
      }
      return cuis;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getLastCufd(pventa) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('pventa',  mssql.Int, pventa);
      const response = await request.query(`SELECT codigo, codigo_control FROM cufd WHERE vigencia > GETDATE() AND pventa = @pventa`);
      var lastcufd = response.recordset[0];
      if (!lastcufd){
        lastcufd = {codigo: 'No existe CUFD vigente'};
      }
      return lastcufd;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
  
  static async getCControlbyCUFD(cufd) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('cufd',  mssql.VarChar(100), cufd);
      const response = await request.query(`SELECT codigo_control FROM cufd WHERE codigo = @cufd`);
      return response.recordset[0].codigo_control;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = CodigosRepo;