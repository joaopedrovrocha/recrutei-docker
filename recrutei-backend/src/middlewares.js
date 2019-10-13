const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if (!token || (token && !token.startsWith('Bearer '))) {
        return res.status(401).json('Token não fornecido')
    }

    token = token.slice(7, token.length)

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('Token invalido')
            }

            // Salva o id do usuario na requisicao
            req.userId = decoded.id

            next()
        })

    } else {
        return res.status(401).json('Token não fornecido')
    }
}

module.exports = {
    checkToken
}