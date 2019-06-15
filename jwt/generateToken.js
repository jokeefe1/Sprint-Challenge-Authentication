const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function generateToken(user) {
    payload = {
        subject: user.id,
        username: user.username
    }

    options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = generateToken