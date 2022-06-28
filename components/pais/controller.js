const storage = require('./storage')

function obtenerPaises( filtroPais ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtroPais ) )
    })
}

function agregarPais( pais ) {
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

module.exports = {
    obtenerPaises,
    agregarPais,
    actualizarPais,
    eliminarPais,
}