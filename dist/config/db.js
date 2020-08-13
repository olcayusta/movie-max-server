"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    database: 'movie_streaming',
    user: 'postgres',
    password: '123456',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});
exports.default = pool;
//# sourceMappingURL=db.js.map