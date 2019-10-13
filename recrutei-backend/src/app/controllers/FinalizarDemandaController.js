const Demanda = require('../models/Demanda')
const Usuario = require('../models/Usuario')

module.exports = {

    async index() { },

    async store(req, res) {
        const { userId } = req
        const { id } = req.params

        try {
            const usuario = await Usuario.findById(userId).populate('perfil_id')

            if (usuario.perfil_id.regra != 'D') {
                return res.status(403).send('Usuário sem permissão para finalizar a demanda!')
            }

            const demanda = await Demanda.findById(id)

            if (!demanda) {
                throw "NOT FOUND"
            }

            demanda.status = 'Finalizado'

            demanda.save()

            res.send(demanda)
        } catch (e) {
            res.status(500).send({ error: `[Demanda::update] [${id}] ${e.message}` })
        }
    },

    async show() { },

    async update() { },

    async destroy() { }

}