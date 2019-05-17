const express = require('express');

const router = express.Router();
const Controller = require('../controllers/Login-controller');
const Validation = require('../validations/Login-validation');

router.post('/', Validation.doLogin, Controller.doLogin);

module.exports = router;