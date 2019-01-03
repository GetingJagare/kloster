const fs = require('fs');
const dir = 'images';
const compress_images = require('compress-images');

const optimizeImage = function (dir, file) {
    console.log(dir + '/' + file);
    if (/\.(jpe?g|png|svg|gif)$/.test(file)) {
        console.log(dir + '/' + file);
        compress_images(dir + '/' + file, dir + '/', {compress_force: true, statistic: false, autoupdate: true}, false,
            {jpg: {engine: 'jpegoptim', command: ['-quality', '60']}},
            {png: {engine: 'pngquant', command: ['--quality=20-50']}},
            {svg: {engine: 'svgo', command: '--multipass'}},
            {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function (){
                console.log('-------------');
                console.log('compressing ' + dir + '/' + file + '...');
                console.log('-------------');
            });
    }
};

const walkDirectory = function (dir) {
    var files = fs.readdirSync(dir);

    files.forEach(function(file) {
        if (!fs.statSync(dir + '/' + file).isDirectory()) {
            optimizeImage(dir, file);
        } else {
            walkDirectory(dir + '/' + file);
        }
    });
};

walkDirectory(dir);
