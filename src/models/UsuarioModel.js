const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    apellido: String,
    nombre: String,
    telefono: Number,
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    localidad: Array,
    provincia: Array,
    activo: Array,
    rol: Array,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('usuarios', UsuarioSchema);