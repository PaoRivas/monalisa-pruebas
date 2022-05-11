const mssql = require('mssql'); 

const dbSettings = {
    user: 'monalisa',
    password: 'Monalisa123',
    server: 'localhost',
    database: 'monalisa_pruebas',
    port: 1433,
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };

const getConnection = async () => {
  try {
    const pool = await mssql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
    mssql,
    getConnection
};