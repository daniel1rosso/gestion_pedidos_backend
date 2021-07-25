const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const fs = require("fs")
const readline = require('readline');
const bcrypt = require('bcrypt')
const UsuarioModel = require('../models/UsuarioModel');
const ClienteModel = require('../models/ClienteModel');

//--- Lectura y procesamiento de archivos para usuarios ---//
router.get('/usuarios', async(req, res) => {
    try {
        fs.readdir('./files/usuarios/', (error, files) => {
            //--- Validacion que haya archivos en el directorio ---//
            if (files != []){
                //--- Vaciado de las colecciones correspondientes a Usuarios ---//
                UsuarioModel.deleteMany().then(() => {
                    //--- Recorremos los archivos que se encuentren en el directorio ---//
                    files.forEach(element => {
                        //--- Creamos una interfaz con la lectura del archivo correspondiente ---//
                        const url_file = './files/usuarios/' + element
                        var myInterface = readline.createInterface({
                            input: fs.createReadStream(url_file, 'utf8')
                        });
                        //--- Abrimos la interfaz creada anteriormente ---//
                        myInterface.on('line', async function (line) {
                            //--- Dividimos el contenido de la linea por el divisor ; ---//
                            userArchivo = line.split(';')
                            //--- Creamos el objeto correspondiente a la linea ---//
                            const user = new UsuarioModel({
                                username: userArchivo[0],
                                password: await bcrypt.hash(userArchivo[1], 10)
                            })
                            //--- Guardamos el objeto ---//
                            user.save()
                        })
                    })
                }).catch(()=>{
                    res.status(500).json({ message: "Hubo un error con respecto al vaciado de las colecciones de Usuarios"})    
                })
            } else {
                res.status(500).json({ message: "No se encuentran archivos en el directorio correspondiente a usuarios, verifique que se han cargados y vuelva a intentarlo" })
            }
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Lectura y procesamiento de archivos para clientes ---//
router.get('/clientes', async(req, res) => {
    try {
        fs.readdir('./files/clientes/', (error, files) => {
            //--- Validacion que haya archivos en el directorio ---//
            if (files != []){
                //--- Vaciado de las colecciones correspondientes a Clientes ---//
                ClienteModel.deleteMany().then(() => {
                    //--- Recorremos los archivos que se encuentren en el directorio ---//
                    files.forEach(element => {
                        //--- Creamos una interfaz con la lectura del archivo correspondiente ---//
                        const url_file = './files/clientes/' + element
                        var myInterface = readline.createInterface({
                            input: fs.createReadStream(url_file, 'utf8')
                        });
                        //--- Abrimos la interfaz creada anteriormente ---//
                        myInterface.on('line', function async (line) {
                            //--- Dividimos el contenido de la linea por el divisor ; ---//
                            clientesArchivo = line.split(';')
                            //--- Creamos el objeto correspondiente a la linea ---//
                            const cliente = new ClienteModel({
                                codigo: clientesArchivo[0],
                                nombre: clientesArchivo[1]
                            })
                            //--- Guardamos el objeto ---//
                            cliente.save();
                        })
                    })
                })
            } else {
                res.status(500).json({ message: "No se encuentran archivos en el directorio correspondiente a clientes, verifique que se han cargados y vuelva a intentarlo" })
            }
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;