const router = require("express").Router();

const UsuarioController = require("../controllers/UsuarioController");

router.post("/cadastro", UsuarioController.cadastrar);

router.post("/login", UsuarioController.login)

router.get("/areaAdmin", UsuarioController.verificaAutenticacao, UsuarioController.verificaIsAdmin, UsuarioController.testeAdmin);

module.exports = router