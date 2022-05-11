const { getConnection, mssql } = require('../database');

class CodigosRepo {

  static async addCuis(form, xmlresponse) {
    try {
        const {ambiente, modalidad, sucursal, pventa} = form;
        const {codigo, utc, cod_mensaje, mensaje, trans} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, ambiente);
        request.input('modalidad',  mssql.Int, modalidad);
        request.input('sucursal',  mssql.Int, sucursal);
        request.input('pventa',  mssql.Int, pventa);
        request.input('codigo',  mssql.VarChar(10), codigo);
        request.input('vigencia', mssql.DateTime, utc);
        request.input('cod_mensaje',  mssql.Int, cod_mensaje);
        request.input('mensaje',  mssql.VarChar(100), mensaje);
        request.input('trans',  mssql.VarChar(10), trans);
        await request.query(
          `INSERT INTO [dbo].[cuis]
          ([ambiente],[modalidad],[sucursal],[pventa],[codigo],[vigencia],[cod_mensaje],[mensaje],[trans])
            VALUES
          (@ambiente, @modalidad, @sucursal, @pventa, @codigo, @vigencia, @cod_mensaje, @mensaje, @trans)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addCufd(form, xmlresponse) {
    try {
        const {ambiente, modalidad, sucursal, pventa, cuis} = form;
        const {codigo, ccontrol, direccion, utc, trans} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, ambiente);
        request.input('modalidad',  mssql.Int, modalidad);
        request.input('sucursal',  mssql.Int, sucursal);
        request.input('pventa',  mssql.Int, pventa);
        request.input('cuis',  mssql.VarChar(10), cuis);
        request.input('codigo',  mssql.VarChar(100), codigo);
        request.input('ccontrol',  mssql.VarChar(50), ccontrol);
        request.input('direccion',  mssql.VarChar(200), direccion);
        request.input('vigencia', mssql.DateTime, utc);
        //request.input('cod_mensaje',  mssql.Int, cod_mensaje);
        //request.input('mensaje',  mssql.VarChar(100), mensaje);
        request.input('trans',  mssql.VarChar(10), trans);
        await request.query(
          `INSERT INTO [dbo].[cufd]
          ([ambiente]
          ,[modalidad]
          ,[sucursal]
          ,[pventa]
          ,[cuis]
          ,[codigo]
          ,[codigo_control], [direccion]
          ,[vigencia]
          ,[trans])
    VALUES
          (@ambiente, @modalidad, @sucursal, @pventa, @cuis, @codigo, @ccontrol, @direccion, @vigencia, @trans)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = CodigosRepo;