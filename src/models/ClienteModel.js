const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    codigo:  { type: String, required: true },
    nombre:  { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('clientes', ClienteSchema);
