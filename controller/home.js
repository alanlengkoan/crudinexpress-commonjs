module.exports = {
    home: (request, response) => {
        var data = {
            layout: 'home/base',
            halaman: 'Beranda',
            title: 'Beranda'
        };
        response.render('home/index', data);
    },

    kontak: (request, response) => {
        var data = {
            layout: 'home/base',
            halaman: 'Kontak',
            title: 'Kontak'
        };
        response.render('home/kontak', data);
    },

    tentang: (request, response) => {
        var data = {
            layout: 'home/base',
            halaman: 'Tentang',
            title: 'Tentang'
        };
        response.render('home/tentang', data);
    },
}