const LoginModel = require('../models/LoginModel');

module.exports = async (req, res, next) => {
    //try {
    try {
        //-- Token Session --//
        const token_session = req.headers.authorization.split(" ")[1];
        //-- User belonging to the token --//
        const user_login = await LoginModel.find({ token: token_session });
        //-- Res --//
        const decoded = (user_login.length !== 0) ? true : false
        res.userData = decoded;
        (decoded) ? next() : res.status(401).json({ message: "Auth failed",  success: 0 })
    } catch (error) {
        res.status(501).json({ message: "Check",  success: 0 })
    }
}

