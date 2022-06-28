const pool = require('../../bd')
const sql = require('mssql');

async function obtenerPaises( filtroPais ) {
    let results = null
    if (filtroPais) {
        results = await pool.query('SELECT * FROM pais WHERE nombre LIKE $1', [ '%' + filtroPais + '%' ])
    } else {
        results = await pool.query('SELECT * FROM pais')
    }
    return results.rows
}

async function agregarPais( pais ) {
    let resultado = await pool.query('INSERT INTO pais(id_pais, nombre) VALUES($1, $2)', [pais.id, pais.nombre])
    return pais
}

async function actualizarPais( pais ) {
    let resultado = await pool.query('UPDATE pais SET nombre=$1 WHERE id_pais = $2', [pais.nombre, pais.id])
    return pais
}

async function eliminarPais( pais ) {
    let resultado = await pool.query('DELETE FROM pais WHERE id_pais = $1', [pais.id])
    return pais
}

module.exports = {
    obtener: obtenerPaises, 
    agregar: agregarPais,
    actualizar: actualizarPais,
    eliminar: eliminarPais,
}