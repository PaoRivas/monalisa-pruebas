CREATE TABLE [dbo].[cuis](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[modalidad] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[codigo] [nvarchar](10) NOT NULL,
	[vigencia] [datetime] NOT NULL,
	[cod_mensaje] [nvarchar](10) NOT NULL,
	[mensaje] [nvarchar](max) NOT NULL,
	[trans] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[cufd](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[modalidad] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo] [nvarchar](100) NOT NULL,
	[codigo_control] [nvarchar](50) NOT NULL,
	[direccion] [nvarchar](max) NOT NULL,
	[vigencia] [datetime] NOT NULL,
	[cod_mensaje] [nvarchar](10) NOT NULL,
	[mensaje] [nvarchar](max) NOT NULL,
	[trans] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[pventa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[modalidad] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[tipo_pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
	[nombre_pventa] [nvarchar](50) NOT NULL,
	[codigo] [nvarchar](100) NOT NULL,
	[cod_mensaje] [nvarchar](10) NOT NULL,
	[mensaje] [nvarchar](max) NOT NULL,
	[trans] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_actividades](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_caeb] [nvarchar](100) NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
	[tipo_actividad] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_fecha_hora](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[fecha_hora] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_lista_actividades](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_actividad] [nvarchar](10) NOT NULL,
	[codigo_documento] [int] NOT NULL,
	[tipo_documento] [nvarchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_lista_leyendas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_actividad] [nvarchar](10) NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_lista_mensajes_servicios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_lista_productos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_actividad] [nvarchar](10) NOT NULL,
	[codigo_producto] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_eventos_significativos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_motivo_anulacion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_pais_origen](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_tipo_documento_identidad](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_tipo_documento_sector](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_tipo_emision](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_tipo_habitacion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_tipo_metodo_pago](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_tipo_moneda](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_tipo_punto_venta](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_tipos_factura](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[sinc_unidad_medida](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ambiente] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[pventa] [int] NOT NULL,
	[cuis] [nvarchar](10) NOT NULL,
	[codigo_clasificador] [int] NOT NULL,
	[descripcion] [nvarchar](60) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO