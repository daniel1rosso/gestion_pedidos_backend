const express = require('express');
const router = express.Router();
const RolModel = require('../models/RolModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los roles ---//
router.get('/', async(req, res) => {
    try {
        const roles = await RolModel.find();
        res.status(201).json(roles);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un rol ---//
router.get('/:rol_id', checkAuth, async(req, res) => {
    try {
        const rol = await RolModel.find({ _id: req.params.rol_id });
        res.status(201).json(rol);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;