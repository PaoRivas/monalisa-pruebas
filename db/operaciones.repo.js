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

  static async getPuntoVenta() {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      const result = await request.query('SELECT codigo, nombre_pventa FROM pventa ORDER BY codigo + 0 ASC');
      //console.log(result);
      //Select * from pventa p where not exists (select * from cuis c where c.pventa = p.codigo)
      return result.recordset;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addEvento(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoMotivoEvento, codigoSucursal, codigoPuntoVenta, cuis, cufd, 
                cufdEvento, fechaHoraInicioEvento, fechaHoraFinEvento, descripcion} = form;
        const {codigoRecepcionEventoSignificativo, transaccion} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('motivo',  mssql.Int, codigoMotivoEvento);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('cufd',  mssql.VarChar(100), cufd);
        request.input('cufdEvento',  mssql.VarChar(100), cufdEvento);
        request.input('cuis',  mssql.VarChar(10), cuis);
        request.input('fechaInicio',  mssql.DateTime, fechaHoraInicioEvento);
        request.input('fechaFinal',  mssql.DateTime, fechaHoraFinEvento);
        request.input('descripcion',  mssql.VarChar(100), descripcion);
        request.input('recepcion',  mssql.Int, codigoRecepcionEventoSignificativo);
        request.input('trans',  mssql.Bit, transaccion);
        await request.query(
          `INSERT INTO [dbo].[eventos_significativos]
          ([ambiente],[motivo_evento] ,[sucursal],[pventa],[cufd] ,[cufd_evento],[cuis],
            [fecha_inicio],[fecha_fin],[descripcion],[codigo_recepcion],[trans])
    VALUES
          (@ambiente, @motivo, @sucursal, @pventa, @cufd, @cufdEvento, @cuis, 
            @fechaInicio, @fechaFinal, @descripcion, @recepcion, @trans)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getEventobyCodigo(codigo) {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      request.input('codigo',  mssql.Int, codigo);
      const result = await request.query('SELECT motivo_evento, fecha_inicio, cufd_evento FROM eventos_significativos WHERE codigo_recepcion = @codigo');
      //console.log(result);
      return result.recordset[0];
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = OperacionesRepo;