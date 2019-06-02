const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUserFromAuthHeader = req => {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
    if (!token) return null;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decodedToken;
    } catch(error) {
        return null;
    }
}
