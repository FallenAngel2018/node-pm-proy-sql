const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')

const routes = express.Router()

routes.get('/', function(req, res) {
    const filtroPais = req.body.usr_pc_name || req.query.usr_pc_name || null

    validate_user(req, res)
    
    controller.obtenerEmpleados( filtroPais )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

// routes.post('/', function(req, res) {
//     controller.agregarPais( req.body )
//         .then((data) => response.success(req, res, data))
//         .catch((error) => response.error(req, res, error) )
// })

routes.post('/validate_user', function(req, res) {
    validate_user(req, res)
})

routes.patch('/', function(req, res) {
    controller.actualizarPais( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

routes.delete('/', function(req, res) {
    controller.eliminarPais( req.body )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})


// #region Complementary methods

routes.get('/get_usrs', function(req, res) {
    const filtroUsr = req.body.usr_pc_name || req.query.usr_pc_name || null
    validate_user(req, res)
    controller.obtenerUsrs( filtroUsr )
        .then((data) => response.success(req, res, data))
        .catch((error) => response.error(req, res, error) )
})

async function validate_user(req, res) {
    const os = require('os')
    const dns = require('dns');

    // Fuente: https://stackoverflow.com/questions/40726568/how-to-grab-the-computer-name-with-nodejs-electron
    const hostname = os.hostname() || "None hostname?"// Computer name?
    
    // Fuente: https://www.geeksforgeeks.org/node-js-dns-lookup-method/
    // Calling dns.lookup() for hostname
    // and displaying them in console as a callback
    var pc_addr = ""
    var family_addr = ""
    const options = { // Setting options for dns.lookup() method
        // Set true to see every IP address avaliable in your pc
        all: false,
    };
    dns.lookup(hostname, options, (err, address, family) => {
        pc_addr = address || "None pc addr"
        family_addr = family ? ("IPv"+family) : "None IPvX family"
        // console.log('address: %j family: IPv%s', address, family);
    })

    const ip_addrs = req.socket.remoteAddress || req.headers['x-forwarded-for'] || "None remoteAddress?"
    
    // Fuente: https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
    const proxy_ip_addrs = req.headers['x-forwarded-for'] || "None proxy addr" // For proxy ip's
    dns.lookup(proxy_ip_addrs, options, (err, address, family) => {
        // pc_addr = address || "None pc addr"
        // family_addr = family ? ("IPv"+family) : "None IPvX family"
        console.log('Proxy IP Address - address: %j family: IPv%s', address, family);
    })

    const moment = require("moment");
    const dt_string = moment().format("DD-MM-YYYY HH:mm:ss") // 24 Hour format


    var http = require('http');

    await http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
        resp.on('data', function(public_ip) {
            console.log("Your Computer Name is:",hostname)
            console.log("Your Computer/Server IP Address is:",pc_addr)
            console.log("Your IP Address family is:",family_addr)
            console.log(`My public IP address is: ${public_ip}`)
            console.log("My remote IP Address is:",ip_addrs)
            console.log("My proxy IP Address is:",proxy_ip_addrs)
            console.log("Page checked at",dt_string) // 28-06-2022 10:08:59

            const emp = {
                "hostname": hostname,
                "ip_addr": pc_addr,
                "remote_ip_addr": ip_addrs,
                "public_ip_addr": public_ip.toString(), // sin toString() <Buffer 31 38 36 2e 36 36 2e 32 33 2e 31 35>
                "proxy_ip_addr": proxy_ip_addrs,
                "checked_time": dt_string,
            }

            controller.validate_user( emp )
                // .then((data) => response.success(req, res, data))
                // .catch((error) => response.error(req, res, error) )

        });
    });

    

    
}

// #endregion


module.exports = routes