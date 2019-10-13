const Usuario = require('../models/Usuario')

module.exports = {

    async index(req, res) {
        const usuarios = await Usuario.find()

        res.send(usuarios)
    },

    async store(req, res) {
        const { nome, login, senha, perfil_id } = req.body

        try {
            const usuario = await Usuario.create({ nome, login, senha, perfil_id })

            res.send(usuario)
        } catch (e) {
            res.status(500).send({ error: `[Usuario::store] [${id}] ${e.message}` })
        }
    },

    async show(req, res) {
        const { id } = req.params

        try {
            const usuario = await Usuario.findById(id)

            if (!usuario) {
                throw "NOT FOUND"
            }

            usuario.senha = ''

            res.send(usuario)
        } catch (e) {
            res.status(500).send({ error: `[Usuario::show] [${id}] ${e.message}` })
        }
    },

    async update(req, res) {
        const { id } = req.params
        let body = req.body

        try {
            const usuario = await Usuario.findById(id)

            if (!usuario) {
                throw "NOT FOUND"
            }

            if (!body.senha || body.senha == '') {
                const { senha, ...newBody } = body;

                body = newBody;
            }

            for (var i in body) {
                usuario[i] = body[i]
            }

            usuario.save()

            res.send(usuario)
        } catch (e) {
            res.status(500).send({ error: `[Usuario::update] [${id}] ${e.message}` })
        }
    },

    async destroy(req, res) {
        const { id } = req.params

        try {
            const usuario = await Usuario.findById(id)

            if (!usuario) {
                throw "NOT FOUND"
            }

            usuario.remove()

            res.send(usuario)
        } catch (e) {
            res.status(500).send({ error: `[Usuario::destroy] [${id}] ${e.message}` })
        }
    }

}