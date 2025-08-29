import { verifyToken } from '../utils/decoded.js';

export const authToken = async (req, res, next) => {

    const token = req.cookies.accessToken; 

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
            details: 'El token de acceso no está presente en las cookies',
        });
    }

    let decoded;
    try {
        decoded = verifyToken(token);
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
            details: error.message || 'El token es inválido o ha expirado',
        });
    }

    if (!decoded || !decoded.idUser) {
        return res.status(401).json({
            message: 'Invalid token payload',
            details: 'El token no contiene un ID válido',
        });
    }

    req.user = decoded;
    next();
};
