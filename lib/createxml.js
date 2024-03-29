module.exports = {
    createXML(fecha, cufd, cuf, numero, pventa, cafc = '<cafc xsi:nil="true"/>') {
        xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <facturaComputarizadaCompraVenta xsi:noNamespaceSchemaLocation="facturaComputarizadaCompraVenta.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <cabecera>
                <nitEmisor>190590027</nitEmisor>
                <razonSocialEmisor>Algoritmos S.R.L.</razonSocialEmisor>
                <municipio>Cochabamba</municipio>
                <telefono>4533535</telefono>
                <numeroFactura>${numero}</numeroFactura>
                <cuf>${cuf}</cuf>
                <cufd>${cufd}</cufd>
                <codigoSucursal>0</codigoSucursal>
                <direccion>AV. Oquendo 654</direccion>
                <codigoPuntoVenta>${pventa}</codigoPuntoVenta>
                <fechaEmision>${fecha}</fechaEmision>
                <nombreRazonSocial>Mi razon social</nombreRazonSocial>
                <codigoTipoDocumentoIdentidad>1</codigoTipoDocumentoIdentidad>
                <numeroDocumento>5115889</numeroDocumento>
                <complemento xsi:nil="true"/>
                <codigoCliente>51158891</codigoCliente>
                <codigoMetodoPago>1</codigoMetodoPago>
                <numeroTarjeta xsi:nil="true"/>
                <montoTotal>100000</montoTotal>
                <montoTotalSujetoIva>100000</montoTotalSujetoIva>
                <codigoMoneda>1</codigoMoneda>
                <tipoCambio>1</tipoCambio>
                <montoTotalMoneda>100000</montoTotalMoneda>
                <montoGiftCard xsi:nil="true"/>
                <descuentoAdicional>0</descuentoAdicional>
                <codigoExcepcion xsi:nil="true"/>
                ${cafc}
                <leyenda>Ley N° 453: Tienes derecho a recibir información sobre las características y contenidos de los
                    servicios que utilices.
                </leyenda>
                <usuario>pperez</usuario>
                <codigoDocumentoSector>1</codigoDocumentoSector>
            </cabecera>
            <detalle>
                <actividadEconomica>620200</actividadEconomica>
                <codigoProductoSin>83143</codigoProductoSin>
                <codigoProducto>JN-131231</codigoProducto>
                <descripcion>Judis Novus</descripcion>
                <cantidad>1</cantidad>
                <unidadMedida>58</unidadMedida>
                <precioUnitario>100000</precioUnitario>
                <montoDescuento>0</montoDescuento>
                <subTotal>100000</subTotal>
                <numeroSerie>124548</numeroSerie>
                <numeroImei>545454</numeroImei>
            </detalle>
        </facturaComputarizadaCompraVenta>`
        return xml;
    }
}