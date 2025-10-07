const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient()

class UsuarioController {
  static async cadastrar(req, res) {
    try{ 
    const { nome, email, password, tipo } = req.body

    const salt = bcryptjs.genSaltSync(8)
    const hashSenha = bcryptjs.hashSync(password, salt)

    const usuario = await client.usuario.create({
      data: {
        nome,
        email,
        password: hashSenha,
        tipo: tipo || "cliente"
      }
    })

    res.json({
       mensagem: "Exito ao cadastrar!",
       erro: false,
    });
  } catch(err){
    res.json({
       mensagem: "Erro ao cadastrar!",
       erro: true,
       mensademDeErro: err
    })
  }
}

  static async login(req, res) {
    const { email, password } = req.body;
    //verificar se o usuario existe
    const usuario = await client.usuario.findUnique({
      where: {
        email: email
      },
    })
    if (!usuario) {
      return res.json({
       mensagem: "Usuario não encontrado",
       erro: true
      })
    }
    //verificar se a senha esta correta
    const senhaCorreta = bcryptjs.compareSync(password, usuario.password)
    if (!senhaCorreta) {
      return res.json({
       mensagem: "Senha Incorreta",
       erro: true
      })
    }
    //emitir um token
    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_SERVIDOR, { expiresIn: "2h" })
    res.json({
      mensagem: "Autenticado!",
      erro: false,
      token: token
    });
  }

  static async verificaAutenticacao(req, res, next) {
    const authHeader = req.headers["authorization"]
    if (authHeader) {

      const token = authHeader.split(" ")[1]

      jwt.verify(token, process.env.SENHA_SERVIDOR, (err, payload) => {
        if (err) {
          return res.json({
            mensagem: "token invalido!",
            erro: true
          })
        }

        req.usuarioId = payload.id
        next()
      })

    } else {
      return res.json({
        mensagem: "token não encontrado",
        erro: true
      })
    }
  }

  static async verificaIsAdmin(req, res, next) {
    if (!req.usuarioId) {
      return res.json({
        mensagem: "você não está autenticado",
        erro: true
      })
    }

    const usuario = await client.usuario.findUnique({
      where: {
        id: req.usuarioId
      }
    })

    if (usuario.tipo !== "admin") {
      return res.json({
        mensagem: "Acesso negado, você não é um administrador",
        erro: true
      })
    }

    next()

  }
  static testeAdmin(req, res) {
    res.json({
      mensagem: "Você é um Admin"
    })
  }
  static paginaHome(req, res) {
    res.json({
      mensagem: "Você está na pagina Home"
    })
  }
}

module.exports = UsuarioController;