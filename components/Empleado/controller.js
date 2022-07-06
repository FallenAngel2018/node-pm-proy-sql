const storage = require('./storage')

function obtenerEmpleados( filtroEmp ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtroEmp ) )
    })
}

function agregarEmpleado( empleado ) {
    return new Promise((resolve, reject) => {
        if (empleado.cedula == null || empleado.cedula == "") {
            return reject('Ingrese una cédula')
        }
        resolve( storage.agregar( empleado ) )
    })
}

function actualizarEmpleado( empleado ) {
    return new Promise((resolve, reject) => {
        if (empleado.cedula == null || empleado.cedula == "") {
            return reject('Ingrese una cédula')
        }
        resolve( storage.actualizar( empleado ) )
    })
}

function eliminarEmpleado( empleado ) {
    return new Promise((resolve, reject) => {
        if (empleado.cedula == null || empleado.cedula == "") {
            return reject('Ingrese una cédula')
        }
        resolve( storage.eliminar( empleado ) )
    })
}

function validate_user( emp ) {
    return new Promise((resolve, reject) => {
        resolve( storage.validar( emp ) )
    })
}

function obtenerUsrs( emp ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener_validar( emp ) )
    })
}

module.exports = {
    obtenerEmpleados,
    agregarEmpleado,
    actualizarEmpleado,

    eliminarEmpleado,
    validate_user,
    obtenerUsrs,
}