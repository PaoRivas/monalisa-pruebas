const { getConnection, mssql } = require('../database');

class RecepcionRepo {

  static async addFactura(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoModalidad, codigoSucursal, codigoPuntoVenta, cuis, cufd, 
                codigoDocumentoSector, codigoEmision, tipoFacturaDocumento} = form;
        const {codigoDescripcion, codigoEstado, codigoRecepcion, transaccion, archivo, fechaEnvio, hashArchivo} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('ambiente',  mssql.Int, codigoAmbiente);
        request.input('modalidad',  mssql.Int, codigoModalidad);
        request.input('sucursal',  mssql.Int, codigoSucursal);
        request.input('pventa',  mssql.Int, codigoPuntoVenta);
        request.input('cufd',  mssql.VarChar(100), cufd);
        request.input('cuis',  mssql.VarChar(10), cuis);
        request.input('sector',  mssql.Int, codigoDocumentoSector);
        request.input('emision',  mssql.Int, codigoEmision);
        request.input('tipo_factura',  mssql.Int, tipoFacturaDocumento);
        request.input('fecha',  mssql.DateTime, new Date(fechaEnvio));
        request.input('archivo',  mssql.Text, archivo);
        request.input('hash',  mssql.VarChar(100), hashArchivo);
        request.input('descripcion',  mssql.VarChar(20), codigoDescripcion);
        request.input('estado',  mssql.Int, codigoEstado);
        request.input('recepcion',  mssql.VarChar(100), codigoRecepcion);
        request.input('trans',  mssql.Bit, transaccion);
        await request.query(
          `INSERT INTO [dbo].[recepcion_factura]
          ([ambiente]
          ,[modalidad]
          ,[sucursal]
          ,[pventa]
          ,[cufd]
          ,[cuis]
          ,[documento_sector]
          ,[emision]
          ,[tipo_factura]
          ,[fecha_envio]
          ,[archivo]
          ,[hash]
          ,[descripcion]
          ,[codigo_estado]
          ,[codigo_recepcion]
          ,[trans])
    VALUES
          (@ambiente, @modalidad, @sucursal, @pventa, @cufd, @cuis, 
            @sector, @emision, @tipo_factura, @fecha, @archivo, @hash,
            @descripcion, @estado, @recepcion, @trans)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }
}

module.exports = RecepcionRepo;