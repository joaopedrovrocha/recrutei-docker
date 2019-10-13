const { Schema, model } = require('mongoose')

const Perfil = new Schema({
    nome: {
        type: String,
        required: true
    },
    regra: {
        type: String,
        enum: ['A', 'R', 'D'],
        required: true
    }
}, { timestamps: true })

module.exports = model('Perfil', Perfil)