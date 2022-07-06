const storage = require('./storage')

function obtenerTareas( filtroTarea ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtroTarea ) )
    })
}

function agregarTarea( tarea ) {
    return new Promise((resolve, reject) => {
        if (tarea.id_tarea == null) {
            return reject('Ingrese un id de tarea.')
        }
        resolve( storage.agregar( tarea ) )
    })
}

function actualizarTarea( tarea ) {
    return new Promise((resolve, reject) => {
        if (tarea.id_tarea == null) {
            return reject('Ingrese un id de tarea.')
        }
        
        resolve( storage.actualizar( tarea ) )
            // .then((data) => response.success(req, res, data, response.success_message()))
            // .catch((error) => response.error(req, res, error) )
    })
}

module.exports = {
    obtenerTareas,
    agregarTarea,
    actualizarTarea,

    // eliminarEmpleado,

}