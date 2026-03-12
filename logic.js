const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret = process.env.secret;

function generateToken(email, role, access) {

    return jwt.sign({
        email: email,
        role: role,
        access: access
    }, "Hello", {
        algorithm: 'HS256'
    });
}

function verifyAccess(token) {

    try {
        const decoded = jwt.verify(token, "Hello", {
            algorithms: ['HS256']
        });

        return decoded;

    } catch (e) {
        return e;
    }
}

module.exports = { generateToken, verifyAccess };
