var sys = require("util"),
    fs = require('fs'),
    os = require('os'),
    mkdirp = require('mkdirp'),
    eol = 'win32' == os.platform() ? '\r\n' : '\n',
    write = function (path, str) {
        fs.writeFile(path, str);
    },
    mkdir = function (path, fn) {
        mkdirp(path, 0755, function (err) {
            if (err) throw err;
            if(fn) fn();
        });
    };
/**
 * Main App.
 */
var app = require('./templates/app').app;
/**
 * Initial Route.
 */
var indexRoute = require('./templates/routes').routes;

var baseCSS = require('./templates/style').styles;

/**
 * Jade layout template.
 */
var layout = require('./templates/layout').layout;

    /**
     * Jade index template.
     */

var viewIndex = require('./templates/index').index;

var KickStart = function(){

};

KickStart.prototype.build = function(config, callback) {
    var rootDir = config.rootDirectory;
    var fullRoot = config.fullRootDirectory;

    fs.mkdirSync(rootDir);
    process.chdir(rootDir);
    var pkg = {
        name: rootDir,
        version: '0.0.1',
        private: true,
        scripts: { start: 'node app' },
        dependencies: {
            express: 'latest',
            jade: 'latest'
        }
    };

    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 4));
    fs.mkdirSync('views');
    fs.mkdirSync('public');
    fs.mkdirSync('public/js');
    fs.mkdirSync('public/css');
    fs.mkdirSync('public/img');
    fs.mkdirSync('lib');
    fs.mkdirSync('routes');
    fs.mkdirSync('models');
    fs.writeFileSync('app.js', app);

    write(fullRoot + '/routes/index.js', indexRoute);
    write(fullRoot + '/views/layout.jade', layout);
    write(fullRoot + '/views/index.jade', viewIndex);
    //css template to be added later
    write(fullRoot + '/public/css/style.css', baseCSS);
    //write(fullRoot + '/public/css/skin.css', skinCss);

    callback(null);

};

exports.KickStart = KickStart;