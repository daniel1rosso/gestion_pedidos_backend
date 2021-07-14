const express = require('express');
const router = express.Router();
const ProductoModel = require('../models/ProductoModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los productos ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const productos = await ProductoModel.find();
        res.status(201).json(productos);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un producto ---//
router.get('/:producto_id', checkAuth, async(req, res) => {
    try {
        const producto = await ProductoModel.find({ _id: req.params.producto_id });
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo Producto ---//
router.post('/new_producto', checkAuth, async(req, res) => {
    try {
        const existingProducto = await ProductoModel.find({ nombre: req.body.nombre})
        if (existingProducto.length !== 0) {
            return res.status(409).json({ message: "The Producto does exist ..." })
        }
        const producto = new ProductoModel({
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            cantidad: req.body.cantidad,
            descripcion: req.body.descripcion,
            proveedor: req.body.proveedor,
            activo: req.body.activo,
            costo: req.body.costo,
            precio_venta: req.body.precio_venta,
           
        });
        const createdProducto = await producto.save();
        res.status(201).json(createdProducto);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de producto ---//
router.put('/:producto_id', checkAuth, (req, res) => {
    ProductoModel.updateMany({ _id: req.params.producto_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de producto ---//
router.delete('/:productoID', checkAuth, async(req, res) => {
    try {
        const deleteProducto = await ProductoModel.deleteOne({ _id: req.params.productoID })
        res.status(200).json({
            message: 'Producto been deleted ...',
            data: deleteProducto,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;