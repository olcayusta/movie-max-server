import {Pool} from 'pg'

const pool = new Pool({
    host: 'localhost',
    database: 'movie_streaming',
    user: 'postgres',
    password: '123456',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

export default pool
