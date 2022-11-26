const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const usuarioPost = async (req, res = response) => {

    const { nombre, email, password } = req.body;
    const usuario = new Usuario({ nombre, email, password });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    // Generar mi JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    });


}

module.exports = {
    usuarioPost
}