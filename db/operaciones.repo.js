const { getConnection, mssql } = require('../database');

class OperacionesRepo {

  static async addPuntoVenta(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoModalidad, codigoSucursal, codigoTipoPuntoVenta, cuis, descripcion, nombrePuntoVenta} = form;
        const {codigoPuntoVenta, transaccion} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('modalidad',  mssql.Int, codigoModalidad);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('tipo',  mssql.Int, codigoTipoPuntoVenta);
        request.input('cuis',  mssql.VarChar(10), cuis);
        request.input('descripcion',  mssql.VarChar(100), descripcion);
        request.input('nombre',  mssql.VarChar(50), nombrePuntoVenta);
        request.input('codigo',  mssql.Int, codigoPuntoVenta);
        request.input('trans',  mssql.Bit, transaccion);
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