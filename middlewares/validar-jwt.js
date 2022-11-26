const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) =>{

    // Leer token
    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }


    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        //Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            });
        }


        // Verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        req.usuario =  usuario;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    
}

module.exports = {
    validarJWT
}