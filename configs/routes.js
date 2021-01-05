var auth = require('../controller/auth');
var home = require('./../controller/home');
var admin = require('./../controller/admin');
const bodyParser = require('body-parser');

// hendle post
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

module.exports = function (app) {
    app.get('/', (request, response) => {
        home.home(request, response);
    });

    app.get('/kontak', (request, response) => {
        home.kontak(request, response);
    });

    app.get('/tentang', (request, response) => {
        home.tentang(request, response);
    });

    app.get('/masuk', (request, response) => {
        auth.masuk(request, response);
    });

    app.get('/keluar', (request, response) => {
        auth.keluar(request, response);
    });

    // untuk authentication
    app.post('/auth', urlencodedParser, (request, response) => {
        auth.auth(request, response);
    });

    app.get('/admin', (request, response) => {
        admin.dashboard(request, response);
    });

    app.get('/admin/profil', (request, response) => {
        admin.profil(request, response);
    });

    // proses ubah foto
    app.post('/admin/profil/upd_foto', (request, response) => {

    });

    // proses ubah akun
    app.post('/admin/profil/upd_akun', urlencodedParser, (request, response) => {
        admin.upd_process(request, response);
    });

    // proses ubah keamanan
    app.post('/admin/profil/upd_keamanan', urlencodedParser, (request, response) => {
        admin.upd_keamanan(request, response);
    });

    app.get('/admin/master', (request, response) => {
        admin.master(request, response);
    });

    app.get('/admin/pustaka', (request, response) => {
        admin.pustaka(request, response);
    });

    app.get('/admin/crud', (request, response) => {
        admin.crud(request, response);
    });

    // untuk tampil form tambah data
    app.get('/admin/crud/add', (request, response) => {
        admin.add(request, response);
    });

    // untuk tampil form ubah data
    app.get('/admin/crud/upd/:id', (request, response) => {
        admin.upd(request, response);
    });

    // untuk proses tambah
    app.post('/admin/crud/add_process', urlencodedParser, (request, response) => {
        admin.add_process(request, response);
    });

    // untuk proses ubah
    app.post('/admin/crud/upd_process', urlencodedParser, (request, response) => {
       admin.upd_process(request, response);
    });

    // untuk proses hapus
    app.post('/admin/crud/del_process', urlencodedParser, (request, response) => {
        admin.del_process(request, response);
    });
}