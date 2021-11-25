const express = require('express');
const router = express.Router();
const ClienteModel = require('../models/ClienteModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los clientes ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const clientes = await ClienteModel.find();
        res.status(201).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un cliente ---//
router.get('/:cliente_id', checkAuth, async(req, res) => {
    try {
        const cliente = await ClienteModel.find({ _id: req.params.cliente_id });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo cliente ---//
router.post('/new_cliente', checkAuth, async(req, res) => {
    try {
        const existingCliente = await ClienteModel.find({ nombre: req.body.nombre, apellido: req.body.apellido })
        if (existingCliente.length !== 0) {
            return res.status(409).json({ message: "The Cliente does exist ..." })
        }
        const cliente = new ClienteModel({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            email: req.body.email,
            direccion: req.body.direccion,
            nro_piso: req.body.nro_piso,
            depto: req.body.depto,
            localidad: req.body.localidad,
            provincia: req.body.provincia,
            activo: req.body.activo,
	        dni:req.body.dni
        });
        const createdCliente = await cliente.save();
        res.status(201).json(createdCliente);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de cliente ---//
router.put('/:cliente_id', (req, res) => {
    ClienteModel.updateMany({ _id: req.params.cliente_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de cliente ---//
router.delete('/:clienteID', async(req, res) => {
    try {
        const deleteCliente = await ClienteModel.deleteOne({ _id: req.params.clienteID })
        res.status(200).json({
            message: 'Cliente been deleted ...',
            data: deleteCliente,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;
