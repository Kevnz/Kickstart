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

/**
 * Initial Route.
 */


var KickStart = function(){

};

KickStart.prototype.build = function(config, callback) {
    var rootDir = config.rootDirectory;
    var fullRoot = config.fullRootDirectory;
    var template = config.template || '';
    var ext;
    console.log(template);
    fs.mkdirSync(rootDir);
    process.chdir(rootDir);
    var pkg = {
        name: rootDir,
        version: '0.0.1',
        private: true,
        scripts: { start: 'node app' },
        dependencies: {
            express: 'latest'
        },
        devDependencies: {
            "grunt": "~0.4.1",
            "grunt-yui-config": "~0.4.0",
            "grunt-contrib-watch": "~0.5.1",
            "grunt-notify": "~0.2.7",
            "grunt-contrib-jshint": "~0.6.2",
            "grunt-contrib-compass": "~0.4.1",
            "grunt-contrib-copy": "~0.4.1"
        }
    };
    if (template === '') {
        ext = 'jade';
       pkg.dependencies.jade ='latest';
    } else if (template === 'handlebars') {
       pkg.dependencies["express3-handlebars"] ='latest';
       ext = 'handlebars';
    } 
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 4));
    fs.mkdirSync('views');
    fs.mkdirSync('sass');
    fs.mkdirSync('public');
    fs.mkdirSync('public/js');
    fs.mkdirSync('public/js/app');
    fs.mkdirSync('public/js/app/views');
    fs.mkdirSync('public/js/app/views/layouts');
    fs.mkdirSync('public/js/app/views/partials');
    fs.mkdirSync('public/js/app/models');
    fs.mkdirSync('public/css');
    fs.mkdirSync('public/img');
    fs.mkdirSync('lib');
    fs.mkdirSync('routes');
    fs.mkdirSync('models');

    var app = require('./templates/'+ template + '/app').app;
    fs.writeFileSync('app.js', app);

    var sassConfig = require('./templates/config-rb').sass; 
    var style = require('./templates/style').styles; 
    fs.writeFileSync('config.rb', sassConfig);
    var indexRoute = require('./templates/routes').routes;
    var layoutPath = './templates/' + template + '/layout'; 
    console.log(layoutPath);
    var layout = require(layoutPath).layout;
    var viewIndex = require('./templates/' + template + '/index').index;
    var grunt = require('./templates/grunt-file').grunt;
    fs.writeFileSync('Gruntfile.js', grunt);
    write(fullRoot + '/routes/index.js', indexRoute);
    write(fullRoot + '/views/layout.'+ ext, layout);
    write(fullRoot + '/views/index.' + ext, viewIndex);
    //css template to be added later
    write(fullRoot + '/sass/style.scss', style);
    //write(fullRoot + '/public/css/skin.css', skinCss);

    callback(null);

};

exports.KickStart = KickStart;