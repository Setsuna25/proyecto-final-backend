const { Router } = require('express');
const { check } = require('express-validator');


const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const { usuarioPost } = require('../controllers/usuarios');


const router = Router();

router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe de ser más de 6 caracteres').isLength({min:6}),
    check('email', 'El correo no es válido').isEmail(),
    validarCampos
], usuarioPost);


module.exports = router;