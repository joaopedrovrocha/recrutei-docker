const req = require('supertest')
const app = require('../app')
const { setupDB, sleep } = require('./test-setup')

const Perfil = require('../app/models/Perfil')

setupDB('test')

const perfilData = { nome: "Administrador" }

test('[GET] /perfil', async done => {
    // Busca todos os perfis cadastrados
    await req(app).get('/perfil')

    done()
})

test('[GET] /perfil/:id', async done => {
    // Busca um perfil pelo id atraves da API
    const { _id: id } = await Perfil.create(perfilData)

    sleep(1000)

    const { body: perfilRes } = await req(app).get(`/perfil/${id}`)

    expect(perfilRes.nome).toBe(perfilData.nome)

    done()

})

test('[POST] /perfil', async done => {
    // Insere um perfil no banco de dados atraves da API
    const { body: perfilRes } = await req(app).post('/perfil').send(perfilData)

    expect(perfilRes.nome).toBe(perfilData.nome)

    done()
})

test('[PUT] /perfil/:id', async done => {
    // Atualiza um perfil pelo id atraves da API
    const { _id: id } = await Perfil.create(perfilData)
    const perfil = { nome: 'Administrador 2' }

    await req(app).put(`/perfil/${id}`).send(perfil)

    sleep(1000)

    const perfilRes = await Perfil.findById(id)

    expect(perfilRes.nome).toBe(perfil.nome)

    done()
})

test('[DELETE] /perfil', async done => {
    // Remove um perfil pelo id atraves da API
    const { _id: id } = await Perfil.create(perfilData)

    await req(app).delete(`/perfil/${id}`)

    sleep(1000)

    const perfilRes = await Perfil.findById(id)

    expect(perfilRes).toBeNull()

    done()
})
