const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')

const routes = express.Router()

routes.get('/', function(req, res) {
    const filtroPais = req.query.texto || null
    controller.obtenerPaises( filtroPais )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.post('/', function(req, res) {
    controller.agregarPais( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.patch('/', function(req, res) {
    controller.actualizarPais( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.delete('/', function(req, res) {
    controller.eliminarPais( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

module.exports = routes