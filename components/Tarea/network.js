const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')
const usrs = require('../Users/other_methods')
const routes = express.Router()

// const img_dir = "../../uploads/"
const img_dir = "uploads/"
var multer  = require('multer');
var upload = multer({ dest: img_dir });
var fs = require('fs');

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('imagen');

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

// routes.post('/subir_imagen', type, function(req, res) {

//     console.log({ type })

//     controller.agregarFoto( req.body )
//         .then((data) => response.success(req, res, data, data[0]["MsgOperacion"]))
//         .catch((error) => response.error(req, res, error) )
// })
// Fuente: https://stackoverflow.com/questions/31530200/node-multer-unexpected-field
routes.post('/subir_imagen', type, function (req, res) {

    // controller.agregarFoto( req.body )
    //     .then((data) => response.success(req, res, data, data[0]["MsgOperacion"]))
    //     .catch((error) => response.error(req, res, error) )

    /** When using the "single"
        data come in "req.file" regardless of the attribute "name". **/
    var tmp_path = req.file.path;
  
    /** The original name of the uploaded file
        stored in the variable "originalname". **/
    var target_path = img_dir + req.file.originalname;
    // var target_path = 'uploads/' + req.file.originalname;
  
    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        const data = { path: target_path }

        response.success(req, res, data, response.success_message())
    });
    src.on('error', function(err) { 
        response.error(req, res, error)
    });
  
});
  

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
