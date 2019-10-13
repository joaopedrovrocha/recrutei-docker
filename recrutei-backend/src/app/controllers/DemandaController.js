const Demanda = require('../models/Demanda')
const Usuario = require('../models/Usuario');

module.exports = {

    async index(req, res) {
        const demandas = await Demanda
            .find()
            .populate('relator_id')
            .populate('desenvolvedor_id')

        res.send(demandas)
    },

    async store(req, res) {
        const { resumo, descricao } = req.body
        const { userId: relator_id } = req

        try {
            const usuario = await Usuario.findById(relator_id).populate('perfil_id')

            if (['R', 'A'].indexOf(usuario.perfil_id.regra) < 0) {
                return res.status(500).send({ error: 'Usuário sem permissão para criar a demanda!' })
            }

            const demanda = await Demanda.create({
                resumo,
                descricao, 
                relator_id,
                status: 'Aberto'
            })

            res.send(demanda)

        } catch (e) {
            res.status(500).send({ error: `[Demanda::store] ${e.message}` })
        }
    },

    async show(req, res) {
        const { id } = req.params

        try {
            const demanda = await Demanda
                .findById(id)
                .populate('relator_id')
                .populate('desenvolvedor_id')

            if (!demanda) {
                throw "NOT FOUND"
            }

            res.send(demanda)
        } catch (e) {
            res.status(500).send({ error: `[Demanda::show] [${id}] ${e.message}` })
        }
    },

    async update(req, res) {
        const { id } = req.params
        const body = req.body

        try {
            const demanda = await Demanda.findById(id)

            if (!demanda) {
                throw "NOT FOUND"
            }

            for (var i in body) {
                demanda[i] = body[i]
            }

            demanda.save()

            res.send(demanda)
        } catch (e) {
            res.status(500).send({ error: `[Demanda::update] [${id}] ${e.message}` })
        }
    },

    async destroy(req, res) {
        const { id } = req.params

        try {
            const demanda = await Demanda.findById(id)

            if (!demanda) {
                throw "NOT FOUND"
            }

            demanda.remove()

            res.send(demanda)
        } catch (e) {
            res.status(500).send({ error: `[Demanda::destroy] [${id}] ${e.message}` })
        }
    }

}