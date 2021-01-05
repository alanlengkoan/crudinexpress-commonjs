const bcryptjs = require('bcryptjs');
var mysqli = require('./../configs/database.js');
var myFunction = require('./../helpers/my_function.js');

module.exports = {
    dashboard: (request, response) => {
        if (request.session.login === true && request.session.level === "admin") {
            var data = {
                layout: 'admin/base',
                halaman: 'Dashboard',
                title: 'Dashboard',
            };
            response.render('admin/dashboard/index', data);
        } else {
            response.redirect('/');
        }
    },

    profil: (request, response) => {
        if (request.session.login === true && request.session.level === "admin") {
            var id_users = request.session.id_users;

            mysqli.query("SELECT * FROM tb_users WHERE id_users = '" + id_users + "'", function (error, results, fields) {
                var data = {
                    layout: 'admin/base',
                    halaman: 'Profil',
                    title: 'Profil',
                    data: results
                };
                response.render('admin/profil/view', data);
            });
        } else {
            response.redirect('/');
        }
    },

    upd_process: (request, response) => {
        var id_users = request.session.id_users;

        mysqli.query('UPDATE tb_users SET nama = ?, email = ?, username = ? WHERE id_users = ?', [request.body.nama, request.body.email, request.body.username, id_users], function (error, results, fields) {
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
    },

    upd_keamanan: (request, response) => {
        var id_users = request.session.id_users;
        var passLama = request.body.passwordlama;
        var passBaru = request.body.passwordbaru;
        var confirmPass = request.body.konfirmasipassword;

        mysqli.query("SELECT * FROM tb_users WHERE id_users = '" + id_users + "'", async (error, results, fields) => {
            // untuk mengecek password
            let verifyPassword = await bcryptjs.compare(passLama, results[0].password);
            // untuk mengecek password sesuai
            if (verifyPassword === true) {
                if (passBaru === confirmPass) {
                    // untuk hash password
                    let hashPassword = await bcryptjs.hash(passBaru, 8);
                    // untuk update password
                    mysqli.query('UPDATE tb_users SET password = ? WHERE id_users = ?', [hashPassword, id_users], (error, results, fields) => {
                        if (error) {
                            response.status(400).json({
                                title: 'Gagal!',
                                text: error['sqlMessage'],
                                icon: 'error',
                                button: 'Ok!'
                            });
                        } else {
                            response.status(200).json({
                                title: 'Berhasil!',
                                text: 'Data diubah!',
                                icon: 'success',
                                button: 'Ok!'
                            })
                        }
                    });
                } else {
                    response.status(200).json({
                        title: 'Peringatan!',
                        text: 'Password baru dan konfirmasi password baru tidak sama!',
                        icon: 'warning',
                        button: 'Ok!'
                    })
                }
            } else {
                response.status(200).json({
                    title: 'Peringatan!',
                    text: 'Password lama yang Anda masukkan tidak sama!',
                    icon: 'warning',
                    button: 'Ok!'
                })
            }
        });
    },

    master: (request, response) => {
        if (request.session.login === true && request.session.level === "admin") {
            var data = {
                layout: 'admin/base',
                halaman: 'Master',
                title: 'Master',
            };
            response.render('admin/master/view', data);
        } else {
            response.redirect('/');
        }
    },

    pustaka: (request, response) => {
        if (request.session.login === true && request.session.level === "admin") {
            var data = {
                layout: 'admin/base',
                halaman: 'Pustaka',
                title: 'Pustaka',
            };
            response.render('admin/pustaka/view', data);
        } else {
            response.redirect('/');
        }
    },

    crud: (request, response) => {
        if (request.session.login === true && request.session.level === "admin") {
            mysqli.query("SELECT * FROM tb_data", (error, results, fields) => {
                var data = {
                    layout: 'admin/base',
                    halaman: 'CRUD',
                    title: 'CRUD',
                    data: results
                };
                response.render('admin/crud/view', data);
            });
        } else {
            response.redirect('/');
        }
    },

    add: (request, response) => {
        if (request.session.login === true && request.session.level === "admin") {
            var data = {
                layout: 'admin/base',
                halaman: 'Tambah Data',
                title: 'Tambah Data',
            };
            response.render('admin/crud/add', data);
        } else {
            response.redirect('/');
        }
    },

    upd: (request, response) => {
        if (request.session.login === true && request.session.level === "admin") {
            var id = request.params.id;

            mysqli.query("SELECT * FROM tb_data WHERE id_data = '" + id + "'", (error, results, fields) => {
                var data = {
                    layout: 'admin/base',
                    halaman: 'Ubah Data',
                    title: 'Ubah Data',
                    data: results
                };
                response.render('admin/crud/upd', data);
            });
        } else {
            response.redirect('/');
        }
    },

    add_process: (request, response) => {
        var id_data = Math.floor(Math.random() * 6) + 1;

        mysqli.query('INSERT INTO tb_data SET ?', {
            id_data: id_data,
            judul: request.body.judul,
            link: request.body.link,
            text: request.body.text,
            ins: myFunction.dateTime(),
            ins_l: request.session.id_users,
            upd: myFunction.dateTime(),
            upd_l: request.session.id_users,
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
    },

    upd_process: (request, response) => {
        mysqli.query('UPDATE tb_data SET judul = ?, link = ?, text = ?, upd = ? WHERE id_data = ?', [request.body.judul, request.body.link, request.body.text, myFunction.dateTime(), request.body.id_data], (error, results, fields) => {
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
    },

    del_process: (request, response) => {
        var id = request.body.id;

        mysqli.query('DELETE FROM tb_data WHERE id_data = "' + id + '"', (error, results, fields) => {
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
        });
    }
}