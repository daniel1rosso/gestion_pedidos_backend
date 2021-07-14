const mongoose = require('mongoose');

const RolSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('roles', RolSchema);