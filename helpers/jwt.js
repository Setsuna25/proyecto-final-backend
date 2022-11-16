const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {


    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                //nose puedo crear el toker 
                reject('No se pueod generar el JWT');
            } else {
                // TOKEN!!
                resolve( token );
            }
        })

    });


}

module.exports = {
    generarJWT
}