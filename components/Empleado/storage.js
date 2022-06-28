const pool = require('../../bd')
const sql = require('mssql');

async function obtenerEmpleados( filtroEmp ) {
    // Sql Server (mssql)
    const conn = await pool.getConnection();
    var queryStr = "";
    let results = null;

    console.log(`filtroEmp: ${filtroEmp}`)

    if (filtroEmp) {
        // results = await pool.query('SELECT * FROM producto WHERE nombre LIKE $1', [ '%' + filtroProducto + '%' ])
        
        queryStr = `SELECT * FROM Cervezas WHERE nombre LIKE '%' + '${filtroEmp}' + '%'`;
        
        results = await conn.request().query(queryStr);
    } else {
        // const result = await conn.request().query("");
        queryStr = "SELECT * FROM Cervezas";
        
        results = await conn.request().query(queryStr);
    }

    // console.log(results.recordset);

    return results.recordset;
}

async function agregarEmpleado( pais ) {
    let resultado = await pool.query('INSERT INTO pais(id_pais, nombre) VALUES($1, $2)', [pais.id, pais.nombre])
    return pais
}

async function actualizarEmpleado( pais ) {
    let resultado = await pool.query('UPDATE pais SET nombre=$1 WHERE id_pais = $2', [pais.nombre, pais.id])
    return pais
}

async function eliminarEmpleado( pais ) {
    let resultado = await pool.query('DELETE FROM pais WHERE id_pais = $1', [pais.id])
    return pais
}

async function validate_user( emp ) {
    console.log({emp})

    const conn = await pool.getConnection();

    var results = null;
    const transaction = new sql.Transaction(conn)
    transaction.begin(err => {
        // 'insert into mytable (mycolumn) values (12345)'
        var queryStr = `EXEC nb_set_checked_time '${emp.hostname}', '${emp.ip_addr}'
                            , '${emp.remote_ip_addr}', '${emp.proxy_ip_addr}'
                            , '${emp.checked_time}'`

        const request = new sql.Request(transaction)
        request.query(queryStr, (err, result) => {
            // ... error checks
            console.dir(result)
            console.log(err)

            results = result

            transaction.commit(err => {
                // ... error checks
                console.log("Transaction committed.")
            })
        })
    })

    return results

    // let resultado = await pool.query('EXEC nb_set_checked_time $1, $2, $3, $4, $5'
    //                 , [emp.hostname, emp.ip_addr, emp.remote_ip_addr
    //                     , emp.proxy_ip_addr, emp.checked_time])
    // return resultado
}

module.exports = {
    obtener: obtenerEmpleados, 
    agregar: agregarEmpleado,
    actualizar: actualizarEmpleado,
    eliminar: eliminarEmpleado,

    validar: validate_user,
}