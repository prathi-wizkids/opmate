"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Debug logs
console.log("User:", process.env.DB_USER);
console.log("Pass:", typeof process.env.DB_PASS, process.env.DB_PASS ? "✓" : "✗");
console.log("DB:", process.env.DB_NAME);
console.log("Socket:", process.env.INSTANCE_UNIX_SOCKET);
// DB client config
const client = new pg_1.Client({
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
    .catch((err) => {
    console.error('❌ Connection error:', err);
    process.exit(1);
});
// Start express server
const PORT = process.env.PORT || 8080;
app.get('/', (_, res) => res.send('Hello from Cloud Run + Postgres!'));
app.listen(PORT, () => {
    console.log(`🚀 Listening on port ${PORT}`);
});
