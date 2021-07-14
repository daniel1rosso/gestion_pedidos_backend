const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    apellido: String,
    nombre: String,
    telefono: Number,
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    direccion: String,
    nro_piso: String,
    depto: String,
    localidad: Number,
    provincia: Number,
    dni:  { type: Number, required: true },
    activo: Number,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('clientes', ClienteSchema);
