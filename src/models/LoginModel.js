const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    user: { type: Array, required: true },
    token: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('logins', LoginSchema);