const pool = require('./config/db');

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(100),
        password TEXT NOT NULL,
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_email UNIQUE (email)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL PRIMARY KEY,
        sender VARCHAR(255) NOT NULL,
        addressee VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        body TEXT,
        shipping_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read BOOLEAN DEFAULT FALSE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await client.query(`
      CREATE INDEX idx_sender ON emails(sender);
    `);

    await client.query(`
      CREATE INDEX idx_addressee ON emails(addressee);
    `);

    await client.query(`
      CREATE INDEX idx_shipping_date ON emails(shipping_date);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS folders (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await client.query(`
      CREATE INDEX idx_name_users ON folders(name, user_id);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS emails_folders (
        email_id INTEGER REFERENCES emails(id) ON DELETE CASCADE,
        folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE,
        PRIMARY KEY (email_id, folder_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS labels (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await client.query(`
      CREATE INDEX idx_name_user_label ON labels(name, user_id);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS emails_labels (
        email_id INTEGER REFERENCES emails(id) ON DELETE CASCADE,
        label_id INTEGER REFERENCES labels(id) ON DELETE CASCADE,
        PRIMARY KEY (email_id, label_id)
      );
    `);

    console.log("All tables and indexes created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    client.release();
  }
};

module.exports = createTables;
