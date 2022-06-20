const { getConnection, mssql } = require('../database');

class EventosRepo {

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
        request.input('fechaInicio',  mssql.DateTime, new Date(fechaHoraInicioEvento));
        request.input('fechaFinal',  mssql.DateTime, new Date(fechaHoraFinEvento));
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
}

module.exports = EventosRepo;