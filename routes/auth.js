/*
    path: api/login
*/


const { Router } = require('express');
const { check } = require('express-validator');

const { login, validarTokenUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login',[
    check('email', 'Email invalido').isEmail().normalizeEmail(),
    check('password', 'La contraseña debe tener minimo de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], login);


router.get('/', [validarJWT], validarTokenUsuario);

module.exports = router;