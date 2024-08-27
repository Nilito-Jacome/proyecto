const createDatabase = require('./createDatabase');
const createTables = require('./createTables');

const initDB = async () => {
  try {
    await createDatabase();
    await createTables();
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

initDB();
