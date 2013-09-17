var sys = require("util"),
    fs = require('fs'),
    os = require('os'),
    eol = 'win32' == os.platform() ? '\r\n' : '\n';

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
    var template = config.template;

    var ext;

    createFolder(rootDir);
    process.chdir(rootDir);

    // app.js
    var app = require('./templates/'+ template + '/app').app;
    fs.writeFileSync('app.js', app);

    // package.json
    createPackage(rootDir, function(pkg) {
        writeFile('package.json', JSON.stringify(pkg, null, 4));
    });

    // views
    createViewsFolder(template);

    // models
    writeFolder('models');

    // routes
    writeFolder('routes');

    // public
    createPublicFolder();


    // sass folder at this level? shouldn't it be in /public/css ?
    fs.mkdirSync('sass');

    // lib
    writeFolder('lib');

/*    if (template === 'jade') {
        ext = 'jade';
       pkg.dependencies.jade ='latest';
    } else if (template === 'handlebars') {
       pkg.dependencies["express3-handlebars"] ='latest';
       ext = 'handlebars';
       fs.mkdirSync('views/layouts');
    } */
    
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

    write(fullRoot + '/views' + (ext === 'handlebars' ? '/layouts/main.handlebars' : '/layout.jade'), layout);
    write(fullRoot + '/views/index.' + ext, viewIndex);
    //css template to be added later
    write(fullRoot + '/sass/style.scss', style);
    //write(fullRoot + '/public/css/skin.css', skinCss);

    callback(null);

};

function createViewsFolder(template) {
    writeFolder('views');
    writeFolder('views/layout');

}

function createPublicFolder() {
    writeFolder('public');
    writeFolder('public/js');
    writeFolder('public/js/app');
    writeFolder('public/js/app/views');
    writeFolder('public/js/app/views/layouts');
    writeFolder('public/js/app/views/partials');
    writeFolder('public/js/app/models');
    writeFolder('public/css');
    writeFolder('public/img');
}

function writeFolder(folder) {
    fs.mkdirSync(folder);
    console.log('create: ' + folder);
}

function writeFile(name, contents) {
    fs.writeFileSync(name, contents);
    console.log('create: ' + name);
}

function createPackage(name, write) {
    var pkg = {
        name: name,
        version: '0.0.1',
        private: true,
        scripts: { start: 'node app' },
        dependencies: {
            express: 'latest',
            'express-state': 'latest'
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
    write(pkg);
}


exports.KickStart = KickStart;
