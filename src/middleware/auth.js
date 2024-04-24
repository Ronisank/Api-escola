const {verify} = require("jsonwebtoken");


async function auth(req, res, next) {
    try {    
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ messagem: 'Token não informado!' });
    }
        const payload = verify(token, process.env.SECRET);
        req.usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({ messagem: 'Token inválido!' });
    }
}

module.exports = auth;