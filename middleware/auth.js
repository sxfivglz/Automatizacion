const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido.' });
    }
}

module.exports = authenticateToken;
