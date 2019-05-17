const express = require('express');

const router = express.Router();
const Controller = require('./../controllers/Venda-controller');
const Validation = require('./../validations/Venda-validation');

router.get('/consultarid', Validation.searchById, Controller.searchById);
router.get('/consultar', Validation.search, Controller.search);
router.post('/inserir', Validation.insert, Controller.insert);
router.put('/atualizar', Validation.update, Controller.update);
router.delete('/deletar', Validation.delete, Controller.delete);

module.exports = router;