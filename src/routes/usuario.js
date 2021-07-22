const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UsuarioModel = require('../models/UsuarioModel');
const checkAuth = require('../middleware/checkAuth');
const fs = require("fs")
const readline = require('readline');

//--- Todos los usuarios ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const users = await UsuarioModel.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un usuario ---//
router.get('/:user_id', checkAuth, async(req, res) => {
    try {
        const user = await UsuarioModel.find({ _id: req.params.user_id });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo usuario ---//
router.post('/signup', async(req, res) => {
    try {
        const existingUser = await UsuarioModel.find({ username: req.body.username })
        if (existingUser.length !== 0) {
            return res.status(409).json({ message: "The User does exist ..." })
        }
        const hashPassword = bcrypt.hash(req.body.password, 10);
        const user = new UsuarioModel({
            username: req.body.username,
            password: hashPassword,
        });
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de usuario ---//
router.put('/:user_id', checkAuth, async (req, res) => {
    //-- Hash del password --//
    const hashPassword = bcrypt.hash(req.body.password, 10);
    //-- User de la bd --//
    const user = await UsuarioModel.find({ _id: req.params.user_id })
    //-- Asignacion de la password de ser ditinta --//
    (hashPassword != user.password) ? user.password = hashPassword : ""
    UsuarioModel.updateMany({ _id: req.params.user_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de usuario ---//
router.delete('/:userID', checkAuth, async(req, res) => {
    try {
        const deletedUser = await UsuarioModel.deleteOne({ _id: req.params.userID })
        res.status(200).json({
            message: 'User been deleted ...',
            data: deletedUser,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;