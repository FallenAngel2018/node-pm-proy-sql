const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')
const usrs = require('../Users/other_methods')
const routes = express.Router()

// routes.get('/', function(req, res) {
routes.post('/', function(req, res) {
    // const filtroEmpleado = req.body.emp_nombre || req.query.emp_nombre || null
    const filtroEmpleado = req.body || req.query || null

    controller.obtenerEmpleados( filtroEmpleado )
        .then((data) => response.success(req, res, data, response.success_message()))
        .catch((error) => response.error(req, res, error) )
})

routes.post('/login', function(req, res) {

    usrs.validar(req, res, entidad, "/login")

    controller.loginEmpleado( req.body )
        .then((data) => response.success(req, res, data, response.success_message()))
        .catch((error) => response.error(req, res, error) )
})

routes.post('/agregar', function(req, res) {

    usrs.validar(req, res, entidad, "/agregar")

    controller.agregarEmpleado( req.body )
        .then((data) => response.success(req, res, data, response.success_message()))
        .catch((error) => response.error(req, res, error) )
})

routes.patch('/actualizar', function(req, res) {
    
    usrs.validar(req, res, entidad, "/actualizar")

    controller.actualizarEmpleado( req.body )
        .then((data) => response.success(req, res, data, response.success_message()))
        .catch((error) => response.error(req, res, error) )

})

routes.delete('/eliminar', function(req, res) {

    usrs.validar(req, res, entidad, "/eliminar")

    controller.eliminarEmpleado( req.body )
        .then((data) => response.success(req, res, data, response.success_message()))
        .catch((error) => response.error(req, res, error) )
})

routes.post('/validate_user', function(req, res) {
    usrs.validar(req, res, entidad, "/validate_user")
    // validate_user(req, res)
        .then((data) => response.success(req, res, data, "Usuario validado"))
        .catch((error) => response.error(req, res, error) )
})

const entidad = "Empleado"

module.exports = routes



// #region Complementary methods

require("dotenv").config();

routes.get('/get_usrs', function(req, res) {
    const filtroUsr = req.body.usr_pc_name || req.query.usr_pc_name || null
    // validate_user(req, res)
    usrs.validar(req, res, entidad, "/get_usrs")
    
    controller.obtenerUsrs( filtroUsr )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

// #endregion

