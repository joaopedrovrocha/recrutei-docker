const { Schema, model } = require('mongoose')

const Demanda = new Schema({
    resumo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    relator_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    desenvolvedor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    status: {
        type: String,
        enum: ['Aberto', 'Finalizado']
    }
}, { timestamps: true })

module.exports = model('Demanda', Demanda)