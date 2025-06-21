import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const app = express();

// Debug logs
console.log("User:", process.env.DB_USER);
console.log("Pass:", typeof process.env.DB_PASS, process.env.DB_PASS ? "✓" : "✗");
console.log("DB:", process.env.DB_NAME);
console.log("Socket:", process.env.INSTANCE_UNIX_SOCKET);

// DB client config
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.INSTANCE_UNIX_SOCKET,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

// Connect to Postgres
client.connect()
  .then(() => {
    console.log('✅ Connected to Postgres! I AM HERE');
    return client.end();
  })
  .catch((err: any) => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });

// Start express server
const PORT = process.env.PORT || 8080;
app.get('/', (_, res) => res.send('Hello from Cloud Run + Postgres!'));
app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
