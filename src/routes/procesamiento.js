const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const fs = require("fs")
const readline = require('readline');
const bcrypt = require('bcrypt')
const UsuarioModel = require('../models/UsuarioModel');

//--- Lectura y procesamiento de archivos para usuarios ---//
router.get('/usuarios', async(req, res) => {
    try {
        fs.readdir('./files/usuarios/', (error, files) => {
            if (files != []){
                users = []

                UsuarioModel.deleteMany().then(() => {
                    files.forEach(element => {
                        const url_file = './files/usuarios/' + element
                        var myInterface = readline.createInterface({
                            input: fs.createReadStream(url_file, 'utf8')
                        });

                        var lineno = 0;
                        myInterface.on('line', function async (line) {
                            lineno++;
                            userArchivo = line.split(';')

                            bcrypt.hash(userArchivo[1], 10).then((hashPassword) => {
                                const user = new UsuarioModel({
                                    username: userArchivo[0],
                                    password: hashPassword
                                })
                                user.save();
                            })
                        })
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