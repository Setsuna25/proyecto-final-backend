const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // Si el usuario está activo
        if (!usuarioDB.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}



const validarTokenUsuario = async ( req, res = response) => {


    // Generar el JWT
    const token = await generarJWT( req.usuario._id );
    
    //const uid = req.uid;


    res.json({
        usuario: req.usuario,
        token: token,
    });
}

module.exports = {
    login,
    validarTokenUsuario
}