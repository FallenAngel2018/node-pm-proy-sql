const pool = require('../../bd')
const sql = require('mssql');
const dns = require('dns')
require("dotenv").config(); // Carga variables de entorno

// FALTA GET
async function obtenerTareas( tarea ) {
    const conn = await pool.getConnection();

    console.log({ tarea })

    try {
        const result = await conn.request()
        // .input('id_empleado', tarea.id_empleado)
        .input('cedula_nombre', tarea.parametro_busqueda)
        .input('tipo_empleado', parseInt(tarea.tipo_empleado)) // 0: Normal, 1: Admin
        .input('estado_tarea', tarea.estado != 'null' ? tarea.estado : null) // 0: PENDIENTE, 1: COMPLETADO, null = Todas las tareas???
        .execute(`nb_obtener_tareas`);

        const results = result.recordset;

        let i = 0
        results.forEach(element => {
            // Este vuelve como un String, en vez de como un Integer
            element["IdTarea"] = parseInt(results[i]["IdTarea"])
            // En este campo, los resultados volvían como [ '1', '1' ], en vez de solo un Int 1
            element["IdEmpleado"] = parseInt(results[i]["IdEmpleado"][0])

            if(element["Imagen"] != null) {
                var originalBase64ImageStr = Buffer.from(element["Imagen"], 'utf8');
                decodedImage = originalBase64ImageStr.toString('base64');

                // console.log({originalBase64ImageStr})
                // console.log({decodedImage})

                // const img_varbinary = `data:image/jpg;base64,${decodedImage}`
                const img_varbinary = `data:image/png;base64,${decodedImage}`

                element["Imagen"] = img_varbinary
            }
            
            i++
        });


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
                .input('cod_vivienda', parseInt(tarea.cod_vivienda)) // Int
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
                .input('estado', parseInt(tarea.estado)) // 0: PENDIENTE, 1: COMPLETADO
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