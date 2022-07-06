const pool = require('../../bd')
const sql = require('mssql');
const dns = require('dns')
require("dotenv").config(); // Carga variables de entorno

// FALTA GET
async function obtenerTareas( tarea ) {
    const conn = await pool.getConnection();

    try {
        const result = await conn.request()
        .input('id_empleado', tarea.id_empleado)
        .input('tipo_empleado', tarea.tipo_empleado) // 0: Normal, 1: Admin
        .input('estado_tarea', tarea.estado) // 0: PENDIENTE, 1: COMPLETADO, null = Todas las tareas???
        .execute(`nb_obtener_tareas`);

        const results = result.recordset;

        return results

    } catch(error) {
        console.log(error)

        return error
    }

}

// Agregar y Actualizar van separados
// Se unen a un solo método aparte definido más abajo
async function agregarTarea( tarea ) {
    return await transaction_AgregarActualizar_Tarea(tarea)
}

async function actualizarTarea( tarea ) {
    return await transaction_AgregarActualizar_Tarea(tarea)
}


// FALTA DELETE


// Fuente: https://codeomelet.com/posts/calling-stored-procedure-with-nodejs-and-mssql
const transaction_AgregarActualizar_Tarea = async (tarea) => {
    

    try {
        const conn = await pool.getConnection();

        var result = null

        // INSERTAR
        if (tarea.id_tarea == 0) {
            console.log({ tarea })

            result = await conn.request()
                .input('id_tarea', tarea.id_tarea) // 0: INSERTAR, 1: ACTUALIZAR
                .input('cedula', tarea.cedula)
                .input('cod_vivienda', tarea.cod_vivienda) // Int
                .input('direccion', tarea.direccion)
                .input('manzana', tarea.manzana)
                .input('villa', tarea.villa)
                .execute(`nb_tarea_crear_actualizar`); // Se crea con estado 0 = Pendiente
        }

        // ACTUALIZAR
        if (tarea.id_tarea >= 1) {
            result = await conn.request()
                .input('id_tarea', tarea.id_tarea) // 0: INSERTAR, 1: ACTUALIZAR
                .input('cedula', tarea.cedula)
                // .input('cod_vivienda', tarea.cod_vivienda) // Int
                // .input('direccion', tarea.direccion)
                // .input('manzana', tarea.manzana)
                // .input('villa', tarea.villa)
                
                // DESCOMENTAR ESTE PARA PRUEBAS EN ANDROID
                // Fuente: https://stackoverflow.com/questions/34383938/how-to-insert-binary-data-into-sql-server-using-node-mssql
                // Fuente: https://stackoverflow.com/questions/50990572/requesterror-validation-failed-for-parameter-invalid-buffer
                // Fuente: https://nodejs.org/en/docs/guides/buffer-constructor-deprecation/
                .input('imagen', sql.VarBinary(sql.MAX), Buffer.from(tarea.imagen)) //  VarBinary(Max)
                .input('cod_medidor', tarea.cod_medidor)
                .input('gps', tarea.gps)
                .input('estado', tarea.estado) // 0: PENDIENTE, 1: COMPLETADO
                .execute(`nb_tarea_crear_actualizar`);
        }
        
        const results = result.recordset;
        
        console.log(results);

        return results
    } catch (error) {
        console.log(error)

        return error
    }

};


module.exports = {
    obtener: obtenerTareas,
    agregar: agregarTarea,
    actualizar: actualizarTarea,

    // eliminar: eliminarEmpleado,
    // validar: validate_user,
    // obtener_validar: obtenerUsrs,
}