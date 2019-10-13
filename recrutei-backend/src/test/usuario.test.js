const req = require('supertest')
const app = require('../app')
const { setupDB, sleep } = require('./test-setup')

const Usuario = require('../app/models/Usuario')

setupDB('test')

const usuarioData = { nome: "Teste", login: "teste", senha: "t3st3" }

test('[GET] /usuario', async done => {
    // Busca todos os perfis cadastrados
    await req(app).get('/usuario')

    done()
})

test('[GET] /usuario/:id', async done => {
    // Busca um usuario pelo id atraves da API
    const { _id: id } = await Usuario.create(usuarioData)

    sleep(1000)

    const { body: usuarioRes } = await req(app).get(`/usuario/${id}`)

    expect(usuarioRes.nome).toBe(usuarioData.nome)

    done()
})

test('[POST] /usuario', async done => {
    // Insere um usuario no banco de dados atraves da API
    const { body: usuarioRes } = await req(app).post('/usuario').send(usuarioData)

    expect(usuarioRes.nome).toBe(usuarioData.nome)

    done()
})

test('[PUT] /usuario/:id', async done => {
    // Atualiza um usuario pelo id atraves da API
    const { _id: id } = await Usuario.create(usuarioData)
    const usuario = { nome: 'Teste 2' }

    await req(app).put(`/usuario/${id}`).send(usuario)

    sleep(1000)

    const usuarioRes = await Usuario.findById(id)

    expect(usuarioRes.nome).toBe(usuario.nome)

    done()
})

test('[DELETE] /usuario', async done => {
    // Remove um usuario pelo id atraves da API
    const { _id: id } = await Usuario.create(usuarioData)

    await req(app).delete(`/usuario/${id}`)

    sleep(1000)

    const usuarioRes = await Usuario.findById(id)

    expect(usuarioRes).toBeNull()

    done()
})
