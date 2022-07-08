const { getConnection, mssql } = require('../database');

class RecepcionRepo {

  static async addRecepcionFactura(form, xmlresponse) {
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

  static async addPaquete(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoModalidad, codigoSucursal, codigoPuntoVenta, cuis, cufd, 
                codigoDocumentoSector, codigoEmision, tipoFacturaDocumento, cafc, cantidadFacturas, codigoEvento} = form;
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
        request.input('cafc',  mssql.VarChar(20), cafc);
        request.input('cantidad',  mssql.Int, cantidadFacturas);
        request.input('evento',  mssql.BigInt, codigoEvento);
        request.input('descripcion',  mssql.VarChar(20), codigoDescripcion);
        request.input('estado',  mssql.Int, codigoEstado);
        request.input('recepcion',  mssql.VarChar(100), codigoRecepcion);
        request.input('trans',  mssql.Bit, transaccion);
        await request.query(
          `INSERT INTO [dbo].[recepcion_paquete]
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
          ,[cafc]
          ,[cantidad]
          ,[codigo_evento]
          ,[descripcion]
          ,[codigo_estado]
          ,[codigo_recepcion]
          ,[trans])
    VALUES
          (@ambiente, @modalidad, @sucursal, @pventa, @cufd, @cuis, 
            @sector, @emision, @tipo_factura, @fecha, @archivo, @hash,
            @cafc, @cantidad, @evento, @descripcion, @estado, @recepcion, @trans)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addAnulacion(form, xmlresponse) {
    try {
        const {codigoAmbiente, codigoModalidad, codigoSucursal, codigoPuntoVenta, cuis, cufd, 
                codigoDocumentoSector, codigoEmision, tipoFacturaDocumento, codigoMotivo, cuf} = form;
        const {codigoDescripcion, codigoEstado, transaccion} = xmlresponse;
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
        request.input('motivo',  mssql.Int, codigoMotivo);
        request.input('cuf',  mssql.VarChar(100), cuf);
        request.input('descripcion',  mssql.VarChar(20), codigoDescripcion);
        request.input('estado',  mssql.Int, codigoEstado);
        request.input('trans',  mssql.Bit, transaccion);
        await request.query(
          `INSERT INTO [dbo].[anulacion]
          ([ambiente]
          ,[modalidad]
          ,[sucursal]
          ,[pventa]
          ,[cufd]
          ,[cuis]
          ,[documento_sector]
          ,[emision]
          ,[tipo_factura]
          ,[codigo_motivo]
          ,[cuf]
          ,[descripcion]
          ,[codigo_estado]
          ,[trans])
    VALUES
          (@ambiente, @modalidad, @sucursal, @pventa, @cufd, @cuis, 
            @sector, @emision, @tipo_factura, @motivo, @cuf,
            @descripcion, @estado, @trans)`
        )
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async addFactura(xmlresponse) {
    try {
        const {numero, cuf, fechaEnvio} = xmlresponse;
        const pool = await getConnection();
        const request = await pool.request();
        request.input('numero',  mssql.Int, numero);
        request.input('cuf',  mssql.VarChar(100), cuf);
        request.input('fecha',  mssql.DateTime, fechaEnvio);
        await request.query(
          `INSERT INTO [dbo].[factura]
          ([numero]
          ,[cuf]
          ,[fecha_emision]
          ,[razon_social]
          ,[documento_identidad]
          ,[numero_documento]
          ,[complemento]
          ,[codigo_cliente]
          ,[metodo_pago]
          ,[numero_tarjeta]
          ,[monto_total]
          ,[monto_total_iva]
          ,[codigo_moneda]
          ,[tipo_cambio]
          ,[monto_total_moneda]
          ,[monto_giftcard]
          ,[descuento_adicional]
          ,[codigo_excepcion]
          ,[cafc]
          ,[usuario])
    VALUES
          (@numero, @cuf, @fecha, 'Razon Social', 1, 5115889, '', 5115889, 
          1, '', 10000, 10000, 1, 1, 10000, '', '', '', '', 'pperez')`
        );
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  static async getNumeroFactura() {
    try {
      const pool = await getConnection();
      const request = await pool.request();
      const response = await request.query(
        `SELECT max(numero) as numero FROM [dbo].[factura]`
      );
      return response.recordset[0].numero;
    }
    catch (error) {
      console.log(error);
      throw(error);
    }
  }

  // static async getCuf() {
  //   try {
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     const response = await request.query(
  //       `SELECT cuf FROM [dbo].[facturas]`
  //     );
  //     return response.recordset;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }
  // }

  // static async getCodigoRecepcionPaquete() {
  //   try {
  //     const pool = await getConnection();
  //     const request = await pool.request();
  //     const response = await request.query(
  //       `SELECT codigo_recepcion FROM [dbo].[recepcion_paquete] WHERE id > 221`
  //     );
  //     return response.recordset;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     throw(error);
  //   }
  // }
}

module.exports = RecepcionRepo;