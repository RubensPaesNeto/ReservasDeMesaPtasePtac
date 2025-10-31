const router = require("express").Router();

const MesaController = require("../controllers/MesaController");
const UsuarioController = require("../controllers/UsuarioController");

router.post("/cadastro", UsuarioController.verificaAutenticacao, UsuarioController.verificaIsAdmin, MesaController.cadastrar);
module.exports = router