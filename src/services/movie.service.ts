import pool from "../config/db"

class MovieService {
    async getAllMovies() {
        const {rows} = await pool.query(`SELECT * FROM movie`)
    }
}

export default new MovieService()
