const usuario = require("../models/usuario")

const mailExiste = async( email = '') => {

    //verificar si el correo existe
    const existeEmail = await usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email: ${ email}, ya está registrado`);
    }
}