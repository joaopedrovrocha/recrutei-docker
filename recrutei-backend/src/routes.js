const router = require('express').Router()

const { checkToken } = require('./middlewares')

/** Auth */
const LoginController = require('./app/controllers/auth/LoginController')

router.post('/login', LoginController.store)

/** Perfil */
const PerfilController = require('./app/controllers/PerfilController')

router.get('/perfil', checkToken, PerfilController.index)
router.get('/perfil/:id', checkToken, PerfilController.show)
router.post('/perfil', checkToken, PerfilController.store)
router.put('/perfil/:id', checkToken, PerfilController.update)
router.delete('/perfil/:id', checkToken, PerfilController.destroy)

/** Usuario */
const UsuarioController = require('./app/controllers/UsuarioController')

router.get('/usuario', checkToken, UsuarioController.index)
router.get('/usuario/:id', checkToken, UsuarioController.show)
router.post('/usuario', checkToken, UsuarioController.store)
router.put('/usuario/:id', checkToken, UsuarioController.update)
router.delete('/usuario/:id', checkToken, UsuarioController.destroy)

/** Demanda */
const DemandaController = require('./app/controllers/DemandaController')
const AtribuirDemandaController = require('./app/controllers/AtribuirDemandaController')
const FinalizarDemandaController = require('./app/controllers/FinalizarDemandaController')

router.get('/demanda', checkToken, DemandaController.index)
router.get('/demanda/:id', checkToken, DemandaController.show)
router.post('/demanda', checkToken, DemandaController.store)
router.put('/demanda/:id', checkToken, DemandaController.update)
router.delete('/demanda/:id', checkToken, DemandaController.destroy)

router.post('/atribuir-demanda/:id', checkToken, AtribuirDemandaController.store)
router.post('/finalizar-demanda/:id', checkToken, FinalizarDemandaController.store)

module.exports = router