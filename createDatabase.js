const { Pool } = require('pg');
require('dotenv').config();

const createDatabase = async () => {
  const client = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'postgres' // Usar la base de datos 'postgres' para crear otras bases de datos
  });

  try {
    const clientConnection = await client.connect();
    const res = await clientConnection.query('SELECT 1 FROM pg_database WHERE datname=$1', [process.env.DB_NAME]);
    if (res.rowCount === 0) {
      // Nota: No se pueden usar parámetros para el nombre de la base de datos
      await clientConnection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database ${process.env.DB_NAME} created successfully.`);
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists.`);
    }
    clientConnection.release();
  } catch (err) {
    console.error("Error creating database:", err);
  } finally {
    await client.end();
  }
};

module.exports = createDatabase;
