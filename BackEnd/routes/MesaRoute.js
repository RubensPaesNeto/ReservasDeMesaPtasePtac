const router = require("express").Router();

const MesaController = require("../controllers/MesaController");

router.post("/cadastro", MesaController.cadastrar);
module.exports = router