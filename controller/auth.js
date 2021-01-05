const bcryptjs = require('bcryptjs');
var mysqli = require('./../configs/database.js');

module.exports = {
    masuk: (request, response) => {
        var data = {
            layout: 'home/base',
            halaman: 'Masuk',
            title: 'Masuk',
        };
        response.render('home/masuk', data);
    },

    keluar: (request, response) => {
        request.session.destroy(function (err) {
            response.redirect('/');
        })
    },

    auth: (request, response) => {
        var username = request.body.username;
        var password = request.body.password;

        mysqli.query('SELECT * FROM tb_users WHERE username = ?', [username], async (error, results, fields) => {
            if (results.length > 0) {
                // untuk mengecek password
                let hashPassword = await bcryptjs.compare(password, results[0].password);
                // apabila password benar
                if (hashPassword === true) {
                    if (results[0].level === 'admin') {
                        request.session.id_users = results[0].id_users;
                        request.session.username = results[0].username;
                        request.session.level = results[0].level;
                        request.session.login = true;
                        response.status(200).json({
                            status: true,
                        })
                    } else {
                        response.status(200).json({
                            status: false,
                            msg: 'Akun Anda tidak terdaftar!',
                            class: 'danger',
                        })
                    }
                } else {
                    response.status(200).json({
                        status: false,
                        msg: 'Username atau Password Anda salah!',
                        class: 'warning',
                    })
                }
            } else {
                response.status(200).json({
                    status: false,
                    msg: 'Username atau Password Anda salah!',
                    class: 'warning',
                })
            }
        });
    }
}