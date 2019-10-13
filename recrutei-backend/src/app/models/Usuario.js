const { Schema, model } = require('mongoose')
var bcrypt = require('bcryptjs')
const validator = require('mongoose-unique-validator')

const Usuario = new Schema({
    nome: {
        type: String,
        required: [true, 'O campo Nome é obrigatório']
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: [true, 'O campo Senha é obrigatório']
    },
    perfil_id: {
        type: Schema.Types.ObjectId,
        ref: 'Perfil'
    }
}, { timestamps: true })

Usuario.pre('save', function (next) {
    var user = this

    if (!user.isModified('senha')) {
        return next()
    }

    bcrypt.hash(user.senha, 10).then(senha => {
        user.senha = senha

        next()
    })

}, function (err) {
    next(err)
})

Usuario.plugin(validator)

module.exports = model('Usuario', Usuario)