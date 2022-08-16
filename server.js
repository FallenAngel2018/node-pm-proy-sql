const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const config = require('./config')
const routes = require('./network/routes')

const path = require('path');

// const multer = require('multer');
// const upload = multer();

// require("dotenv").config();



var app = express()

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended:false}) )

var allowlist = ['http://localhost:58809',
'http://localhost:56649',
'http://localhost:56649',
]
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

var corsOptions = {
    origin: 'http:localhost',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Fuente: https://expressjs.com/en/resources/middleware/cors.html
// Simple Usage (Enable All CORS Requests)
// app.use(cors())
app.use(cors(corsOptionsDelegate)); // corsOptions

// Redirecciona hacia un index.html 
// app.use( config.CLIENT_URL, express.static(config.CLIENT_DIR) )
// app.use(express.static('public')) // http://localhost:3000/inedx.html

// Fuente: https://stackoverflow.com/questions/56758241/node-js-express-how-to-get-data-from-body-form-data-in-post-request
// for parsing multipart/form-data
// app.use(upload.array()); 

app.use(express.static( path.join(__dirname, config.CLIENT_DIR), { index: 'inedx.html' } ))

// Fuente: https://www.geeksforgeeks.org/express-js-res-sendfile-function/
// With middleware
// ERROR: Usar esto retorna la pagina inedx.html en los requests,
// y quitarlo devuelve el json que debe 
// app.use('/', function(req, res, next){
    
//     var options = {
//         root: path.join(__dirname, config.CLIENT_DIR)
//     };
     
//     var fileName = 'inedx.html';
//     res.sendFile( fileName, options );

// });


routes( app )

app.listen( config.PORT )
console.log( `${process.env.SERVER_NAME || "localhost"}.` )
console.log( `La aplicacion esta escuchando en el ${process.env.HOSTNAME || "localhost"}:${config.PORT}/` )
