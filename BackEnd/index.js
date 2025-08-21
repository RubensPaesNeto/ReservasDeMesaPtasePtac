const express = require("express")
const app = express()

app.use(express.json());

const UsuariosRoutes = require("./routes/UsuarioRoute.js")
app.use("/usuarios", UsuariosRoutes)

app.listen(51213, (err) => {
    console.log("aplicação rodandoem localhost:51213")
});