const Demanda = require('../models/Demanda')
const Usuario = require('../models/Usuario')

module.exports = {

    async index(req, res) { },

    async store(req, res) {
        const { userId: desenvolvedor_id } = req
        const { id } = req.params

        try {
            const desenvolvedor = await Usuario.findById(desenvolvedor_id).populate('perfil_id')

            if (desenvolvedor.perfil_id.regra != 'D') {
                return res.status(403).send('Usuário sem permissão para finalizar a demanda!')
            }

            const demanda = await Demanda.findById(id)

            if (!demanda) {
                throw "NOT FOUND"
            }

            demanda.desenvolvedor_id = desenvolvedor_id;

            demanda.save()

            res.send(demanda)
        } catch (e) {
            res.status(500).send({ error: `[Demanda::update] [${id}] ${e.message}` })
        }
    },

    async show(req, res) { },

    async update(req, res) { },

    async destroy(req, res) { }

}