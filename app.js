// package
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const app = express();
// file
var mysqli = require('./configs/connect.js');
var myFunction = require('./helpers/my_function.js');

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
var publicDirectory = 'public/assets';
app.use(express.static(publicDirectory));

// template engine
app.use(expressLayouts);
app.set('layout', 'home/base', 'admin/base');
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    var data = {
        layout: 'home/base',
        halaman: 'Beranda',
        title: 'Beranda'
    };
    response.render('home/index', data);
});

app.get('/kontak', (request, response) => {
    var data = {
        layout: 'home/base',
        halaman: 'Kontak',
        title: 'Kontak'
    };
    response.render('home/kontak', data);
});

app.get('/tentang', (request, response) => {
    var data = {
        layout: 'home/base',
        halaman: 'Tentang',
        title: 'Tentang'
    };
    response.render('home/tentang', data);
});

app.get('/admin', (request, response) => {
    var data = {
        layout: 'admin/base',
        halaman: 'Dashboard',
        title: 'Dashboard',
    };
    response.render('admin/dashboard/index', data);
});

app.get('/admin/master', (request, response) => {
    var data = {
        layout: 'admin/base',
        halaman: 'Master',
        title: 'Master',
    };
    response.render('admin/master/view', data);
});

app.get('/admin/pustaka', (request, response) => {
    var data = {
        layout: 'admin/base',
        halaman: 'Pustaka',
        title: 'Pustaka',
    };
    response.render('admin/pustaka/view', data);
});

app.get('/admin/crud', (request, response) => {
    mysqli.query("SELECT * FROM tb_data", function (error, results, fields) {
        var data = {
            layout: 'admin/base',
            halaman: 'CRUD',
            title: 'CRUD',
            data: results
        };

        console.log(results);
        response.render('admin/crud/view', data);
    });
});

// untuk tampil form tambah data
app.get('/admin/crud/add', (request, response) => {
    var data = {
        layout: 'admin/base',
        halaman: 'Tambah Data',
        title: 'Tambah Data',
    };
    response.render('admin/crud/add', data);
});

// untuk proses tambah
app.post('/admin/crud/add_process', urlencodedParser, (request, response) => {
    var id_data = Math.floor(Math.random() * 6) + 1;

    mysqli.query('INSERT INTO tb_data SET ?', {
        id_data: id_data,
        judul: request.body.judul,
        link: request.body.link,
        text: request.body.text,
        ins: myFunction.dateTime(),
        upd: myFunction.dateTime(),
    }, function (error, results, fields) {
        if (error) {
            var json = {
                title: 'Gagal!',
                text: error['sqlMessage'],
                icon: 'error',
                button: 'Ok!'
            };
        } else {
            var json = {
                title: 'Berhasil!',
                text: 'Data disimpan!',
                icon: 'success',
                button: 'Ok!'
            };
        }
        // untuk respon json
        response.json(json);
    });
});

// untuk proses ubah
app.post('/admin/crud/upd_process', urlencodedParser, (request, response) => {
    mysqli.query('UPDATE tb_data SET judul = ?, link = ?, text = ?, upd = ? WHERE id_data = ?', [request.body.judul, request.body.link, request.body.text, myFunction.dateTime(), request.body.id_data], function (error, results, fields) {
       if (error) {
            var json = {
                title: 'Gagal!',
                text: error['sqlMessage'],
                icon: 'error',
                button: 'Ok!'
            };
        } else {
            var json = {
                title: 'Berhasil!',
                text: 'Data diubah!',
                icon: 'success',
                button: 'Ok!'
            };
        }
        // untuk respon json
        response.json(json);
    });
});

// untuk tampil form ubah data
app.get('/admin/crud/upd/:id', (request, response) => {
    var id = request.params.id;

    mysqli.query("SELECT * FROM tb_data WHERE id_data = '" + id + "'", function (error, results, fields) {
        var data = {
            layout: 'admin/base',
            halaman: 'Ubah Data',
            title: 'Ubah Data',
            data: results
        };
        response.render('admin/crud/upd', data);
    });
});

// untuk hapus data
app.post('/admin/crud/del', urlencodedParser, (request, response) => {
    var id = request.body.id;

    mysqli.query('DELETE FROM tb_data WHERE id_data = "' + id + '"', function (error, results, fields) {
        if (error) {
            var json = {
                title: 'Gagal!',
                text: error,
                icon: 'danger',
                button: 'Ok!'
            };
        } else {
            var json = {
                title: 'Berhasil!',
                text: 'Data dihapus!',
                icon: 'success',
                button: 'Ok!'
            };
        }
        // untuk respon json
        response.json(json);
    })
});

// untuk host
app.listen(8000, '127.0.0.1', () => {
    console.log('Server sedang berjalan....');
});