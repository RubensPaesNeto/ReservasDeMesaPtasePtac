
const express = require("express")
const app = express()
  const cors = require('cors');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173'
}));

const UsuariosRoutes = require("./routes/UsuarioRoute.js")
app.use("/usuarios", UsuariosRoutes)

const MesaRouter = require("./routes/MesaRoute.js")
app.use("/mesa", MesaRouter)

module.exports = app
