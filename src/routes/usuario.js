const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UsuarioModel = require('../models/UsuarioModel');
const checkAuth = require('../middleware/checkAuth');
const fs = require("fs")
const readline = require('readline');
const { Console } = require('console');

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
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            username: req.body.username,
            password: hashPassword,
            localidad: req.body.localidad,
            provincia: req.body.provincia,
            dni: req.body.dni,
            activo: {
                "id": 0,
                "nombre": "Activo"
            },
            rol: {
                "id": 2,
                "nombre": "Usuario"
            }
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

//--- Lectura y procesamiento de archivos ---//
router.get('/procesar/archivo', async(req, res) => {
    try {
        fs.readdir('./files/usuarios/', (error, files) => {
            if (files != []){
                users = []
                files.forEach(element => {
                    const url_file = './files/usuarios/' + element
                    var myInterface = readline.createInterface({
                        input: fs.createReadStream(url_file, 'utf8')
                    });
                      
                    var lineno = 0;
                    myInterface.on('line', function (line) {
                        lineno++;
                        users.push(line.split(';'))
                        console.log(users)
                    })
                })
            } else {
                res.status(500).json({ message: error })
            }
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});


module.exports = router;