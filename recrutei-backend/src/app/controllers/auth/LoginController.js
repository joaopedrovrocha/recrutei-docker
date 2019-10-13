const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const Usuario = require('../../models/Usuario')

module.exports = {

    async index(req, res) { },

    async store(req, res) {
        const { login, senha } = req.body

        const usuario = await Usuario.findOne({ login }).populate('usuario', '-senha').populate('perfil_id')

        if (!usuario) {
            return res.status(404).send('Usuário não encontrado!')
        }

        const result = bcrypt.compareSync(senha, usuario.senha)

        if (!result) {
            return res.status(401).send('Senha inválida!')
        }

        const expiracao = 24 * 60 * 60
        const accessToken = jwt.sign({ id: usuario._id }, process.env.SECRET_KEY, { expiresIn: expiracao })

        res.send({ "usuario": usuario, "access_token": accessToken, "expires_in": expiracao })
    },

    async show(req, res) { },

    async update(req, res) { },

    async destroy(req, res) { }

}