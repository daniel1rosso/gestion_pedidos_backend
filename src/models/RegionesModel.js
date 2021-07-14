const mongoose = require('mongoose');

const RolSchema = mongoose.Schema({
    name: { type: String, required: true },
    regions: { type: Array, required: true }
})

module.exports = mongoose.model('regiones_comunas', RolSchema);