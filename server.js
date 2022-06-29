const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const routes = require('./network/routes')

// require("dotenv").config();

var app = express()

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended:false}) )
// Redirecciona hacia un index.html 
app.use( config.CLIENT_URL, express.static( config.CLIENT_DIR ) )

routes( app )

app.listen( config.PORT )
console.log( `${process.env.SERVER_NAME || "localhost"}.` )
console.log( `La aplicacion esta escuchando en el ${process.env.HOSTNAME || "localhost"}:${config.PORT}.` )
