import pool from "../config/db"
import {User} from "../models/user.model"

export class UserService {
    public async getAllUsers(): Promise<User[]> {
        const {rows} = await pool.query(`SELECT * FROM "user"`)
        return rows
    }
}

export const userService = new UserService()
