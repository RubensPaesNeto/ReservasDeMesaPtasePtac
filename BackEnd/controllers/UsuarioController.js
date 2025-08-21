const path = require("path")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient()

class UsuarioController{
     static async cadastrar(req,res) {
        const {nome, email, password, tipo} = req.body

        const salt = bcryptjs.genSaltSync(8)
        const hashSenha = bcryptjs.hashSync(password, salt)
        
       const usuario = await client.Usuario.create({
        data:{
          nome, 
          email,
          password: hashSenha,
          tipo: 'usuario',
        },})

        res.json({
            usuarioId: usuario.id,
        });
    }
}
module.exports = UsuarioController;