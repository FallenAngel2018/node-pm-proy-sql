const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')

const routes = express.Router()

routes.get('/', function(req, res){

    console.log(`req.body.nombre: ${req.body.nombre}`)
    console.log(`req.query.nombre: ${req.query.nombre}`)

    // Como Json Body, parecido a post
    const filtroProducto = req.body.nombre || null

    // // En el body de la url
    // const filtroProducto = req.query.nombre || null

    controller.obtenerProductos(filtroProducto)
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.post('/', function(req, res) {
    controller.agregarProducto( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.patch('/', function(req, res) {
    controller.actualizarProducto( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.delete('/', function(req, res) {
    controller.eliminarProducto( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})


module.exports = routes