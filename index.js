require('dotenv').config();

console.log("User:", process.env.DB_USER);
console.log("Pass:", typeof process.env.DB_PASS, process.env.DB_PASS ? "✓" : "✗");
console.log("DB:", process.env.DB_NAME);
console.log("Socket:", process.env.INSTANCE_UNIX_SOCKET);

const { Client } = require('pg');
 
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.INSTANCE_UNIX_SOCKET, // e.g., /cloudsql/project:region:instance
});

client.connect()
  .then(() => {
    console.log('✅ Connected to Postgres!');
    return client.end();
  })
  .catch(err => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });
