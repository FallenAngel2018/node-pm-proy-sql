const pais = require('../components/pais/network')
const producto = require('../components/producto/network')
const empleado = require('../components/Empleado/network')
const tarea = require('../components/Tarea/network')
const user = require('../components/Users/network')

const routes = function( server ) {
    server.use('/pais', pais)
    server.use('/producto', producto)
    server.use('/empleado', empleado)
    server.use('/tarea', tarea)
    server.use('/user', user)
}

module.exports = routes