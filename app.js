'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var engines = require("consolidate");

var timeout = require('connect-timeout'); //express v4

//Cors handler
var cors = require('cors');

var app = express();

//routes file
var user_routes = require('./routes/user_routes');

//CORS
app.use(cors());

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(timeout(60000));

//routes 
app.use('/api/user', user_routes);

//export
module.exports = app;