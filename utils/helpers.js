const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUserFromCookieToken = req => {
    const token = req.cookies.token ? req.cookies.token.split(' ')[1] : null;
    if (!token) return null;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decodedToken;
    } catch(error) {
        return null;
    }
}