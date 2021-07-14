const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: String,
    codigo: { type: String, required: true },
    cantidad: Number,
    descripcion: String,
    proveedor: Array,
    activo: Number,
    costo: Number,
    precio_venta: Number,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('productos', ProductoSchema);