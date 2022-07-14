const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')
const usrs = require('../Users/other_methods')
const routes = express.Router()

/* 
    // En Node.js
    // Fuente: https://stackoverflow.com/questions/41042527/node-js-how-to-convert-to-image-from-varbinary-of-ms-sql-server-datatype
    var originalBase64ImageStr = Buffer.from(imagen_varbinary_de_sql, 'utf8');
    decodedImage = originalBase64ImageStr.toString('base64');

    console.log({originalBase64ImageStr})
    console.log({decodedImage})

    const img_varbinary = `data:image/jpg;base64,${decodedImage}`


    // En html
    <img src="{ img_varbinary }"/>

*/

// routes.get
routes.post('/', function(req, res) {
    const filtroTarea = req.body || req.query || null

    // usrs.validar(req, res, entidad, "/")
    
    controller.obtenerTareas( filtroTarea )
        .then((data) => response.success(req, res, data, response.success_message()))
        .catch((error) => response.error(req, res, error) )
})

routes.post('/agregar', function(req, res) {

    usrs.validar(req, res, entidad, "/agregar")

    controller.agregarTarea( req.body )
        .then((data) => response.success(req, res, data, data[0]["MsgOperacion"]))
        .catch((error) => response.error(req, res, error) )
})

routes.patch('/actualizar', function(req, res) {
    
    usrs.validar(req, res, entidad, "/actualizar")

    controller.actualizarTarea( req.body )
        .then((data) => response.success(req, res, data, data[0]["MsgOperacion"]))
        .catch((error) => response.error(req, res, error) )

})

const entidad = "Tarea"

module.exports = routes
