const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
});


UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
})

module.exports = model('Usuario', UsuarioSchema);