import restana from "restana"
import { User } from "./models/user.model"
import pool from "./config/db"

import http from "http"
import { userService } from "./services/user.service"

const app = restana({
  server: http.createServer()
})

app.get("/", async (req, res) => {
  res.send("Hello world")
})

app.get("/users", async (req, res) => {
  const users = userService.getAllUsers()
  res.send(users)
})

app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params
  const { rows } = await pool.query('SELECT * FROM "user" WHERE id = $1', [
    userId
  ])
  const user: User = rows[0]
  res.send(user)
})

export default app
