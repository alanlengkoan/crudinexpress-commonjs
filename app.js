// package
const express = require('express');
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();

// file
var mysqli = require('./configs/database.js');
var routes = require('./configs/routes');

// untuk cek koneksi database
mysqli.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL terkoneksi..");
    }
});

// hendle post
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

// public & assets static file
var publicDirectory = 'public';
app.use(express.static(publicDirectory));

// template engine
app.use(expressLayouts);
app.set('layout', 'home/base', 'admin/base');
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');

// set session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// routes
routes(app);

// untuk host
app.listen(8000, '127.0.0.1', () => {
    console.log('Server sedang berjalan....');
});