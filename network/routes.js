const pais = require('../components/pais/network')
const producto = require('../components/producto/network')
const empleado = require('../components/Empleado/network')

const routes = function( server ) {
    server.use('/pais', pais)
    server.use('/producto', producto)
    server.use('/empleado', empleado)
}

module.exports = routes