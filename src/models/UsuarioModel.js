const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('usuarios', UsuarioSchema);