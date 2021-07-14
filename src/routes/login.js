const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const LoginModel = require('../models/LoginModel');
const UsuarioModel = require('../models/UsuarioModel');
var jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');

//--- Login al sistema ---//
router.post('/', (req, res) => {
    UsuarioModel.findOne({ username: req.body.username }).exec()
        .then(user => {
            if (user) {
                if(user.activo[0].id == 0) {
                    verifyPassword(user, req, res)
                } else {
                    res.status(500).json({ message: "Inactive user" , success: 0})
                }
            } else {
                res.json({ message: "Incorrect username or password...",  success: 0 })
            }
        }).catch(error => {
            res.status(500).json({ message: `error : ${error}` })
        });
});

//--- Verificacion de contraseña ---//
const verifyPassword = (user, req, res) => {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return res.status(500).json({ message: err })
        else {
            if (result) {
                return getToken(user, res)
            } else {
                return res.json({ message: "Authentication failed ...",  success: 0 })
            }
        }
    })
}

//--- Generacion de Token ---//
const getToken = (user, res) => {
    const token = jwt.sign({ username: user.username, userId: user._id, },
        Math.random().toString(36).substring(0,20))
    
    // Save session in collection
    const login = new LoginModel({
        user: user,
        token: token
    });
    const createdSession = login.save();

    if(createdSession) {
        res.json({
            success: 1,
            message: "Auth successful",
            "bearer": "Bearer",
            token: token,
            "id":user._id,
            "username": user.username,
            "authorities": {"authority":user.rol[0].nombre}
        });
    } else {
        res.json({ message: "Authentication failed ...",  success: 0 })
    }
}

//--- Logout al sistema ---//
router.post('/logout', checkAuth, async (req, res) => {
    //-- Token Session --//
    const token_session = req.headers.authorization.split(" ")[1];
    const deletedSession = await LoginModel.deleteOne({ token: token_session })
    const decoded = (deletedSession.length !== 0) ? true : false
    res.json({ message: "Logout Successful...",  success: 0 })
});

module.exports = router;