const Perfil = require('../models/Perfil')

module.exports = {

    async index(req, res) {
        const perfis = await Perfil.find()

        res.send(perfis)
    },

    async store(req, res) {
        const { nome, regra } = req.body

        try {
            const perfil = await Perfil.create({ nome, regra })

            res.send(perfil)

        } catch (e) {
            res.status(500).send({ error: `[Perfil::store] [${id}] ${e.message}` })
        }
    },

    async show(req, res) {
        const { id } = req.params

        try {
            const perfil = await Perfil.findById(id)

            if (!perfil) {
                throw "NOT FOUND"
            }

            res.send(perfil)
        } catch (e) {
            res.status(500).send({ error: `[Perfil::show] [${id}] ${e.message}` })
        }
    },

    async update(req, res) {
        const { id } = req.params
        const body = req.body

        try {
            const perfil = await Perfil.findById(id)

            if (!perfil) {
                throw "NOT FOUND"
            }

            for (var i in body) {
                perfil[i] = body[i]
            }

            perfil.save()

            res.send(perfil)
        } catch (e) {
            res.status(500).send({ error: `[Perfil::update] [${id}] ${e.message}` })
        }
    },

    async destroy(req, res) {
        const { id } = req.params

        try {
            const perfil = await Perfil.findById(id)

            if (!perfil) {
                throw "NOT FOUND"
            }

            perfil.remove()

            res.send(perfil)
        } catch (e) {
            res.status(500).send({ error: `[Perfil::destroy] [${id}] ${e.message}` })
        }
    }

}