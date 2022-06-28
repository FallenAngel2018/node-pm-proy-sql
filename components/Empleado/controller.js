const storage = require('./storage')

function obtenerEmpleados( filtroEmp ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtroEmp ) )
    })
}

function agregarEmpleado( pais ) {
    return new Promise((resolve, reject) => {
        if (pais.id == null || pais.nombre ==null) {
            return reject('No existen los datos')
        }
        resolve( storage.agregar( pais ) )
    })
}

function actualizarPais( pais ) {
    return new Promise((resolve, reject) => {
        if (pais.id == null || pais.nombre ==null) {
            return reject( 'No existen los datos.' )
        }
        resolve( storage.actualizar( pais ) )
    })
}

function eliminarPais( pais ) {
    return new Promise((resolve, reject) => {
        if (pais.id == null) {
            return reject('No existen los datos.')
        }
        resolve( storage.eliminar( pais ) )
    })
}

function validate_user( emp ) {
    return new Promise((resolve, reject) => {
        // if (pais.hostname == null || pais.nombre ==null) {
        //     return reject('No existen los datos')
        // }
        resolve( storage.validar( emp ) )
    })
}

module.exports = {
    obtenerEmpleados,
    agregarEmpleado,

    actualizarPais,
    eliminarPais,
    
    validate_user
}