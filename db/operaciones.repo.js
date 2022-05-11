const { getConnection, mssql } = require('../database');

class OperacionesRepo {

  static async addPventa(form, xmlresponse) {
    try {
        const {ambiente, modalidad, sucursal, tipo, cuis, descripcion, nombre} = form;
        const {codigo, trans} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, ambiente);
        request.input('modalidad',  mssql.Int, modalidad);
        request.input('sucursal',  mssql.Int, sucursal);
        request.input('tipo',  mssql.Int, tipo);
        request.input('cuis',  mssql.VarChar(10), cuis);
        request.input('descripcion',  mssql.VarChar(100), descripcion);
        request.input('nombre',  mssql.VarChar(50), nombre);
        request.input('codigo',  mssql.VarChar(100), codigo);
        //request.input('cod_mensaje',  mssql.Int, cod_mensaje);
        //request.input('mensaje',  mssql.VarChar(100), mensaje);
        request.input('trans',  mssql.VarChar(10), trans);
        await request.query(
          `INSERT INTO [dbo].[pventa]
          ([ambiente],[modalidad],[sucursal],[tipo_pventa],[cuis],[descripcion],[nombre_pventa],[codigo],[trans])
    VALUES
          (@ambiente, @modalidad, @sucursal, @tipo, @cuis, @descripcion, @nombre, @codigo, @trans)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = OperacionesRepo;