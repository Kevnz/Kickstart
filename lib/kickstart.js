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
    var precompiler = config.precompiler;

    writeFolder(rootDir);
    process.chdir(rootDir);

    // app.js
    var app = require('./templates/'+ template + '/app').app;
    fs.writeFileSync('app.js', app);

    // package.json
    createPackage(rootDir, template);

    // views
    createViewsFolder(fullRoot, template);

    // models
    writeFolder('models');

    // routes
    writeFolder('routes');

    // public
    createPublicFolder();

    // routes
    var indexRoute = require('./templates/routes').routes;
    writeFile(fullRoot + '/routes/index.js', indexRoute);

    var style = require('./templates/style').styles; 
    if (precompiler === 'sass') {
        writeFolder('sass');

        var sassConfig = require('./templates/config-rb').sass; 
        writeFile('config.rb', sassConfig);

        // todo: idiomatic sass?
        writeFile(fullRoot + '/sass/style.scss', style);
    }
    else if (precompiler === 'less') {
        writeFolder('less');
        writeFile(fullRoot + '/sass/style.less', style);
    }
    else {
        // none / not recognised...
        writeFile(fullRoot + '/pubic/css/style.css', style);
        //writeFile(fullRoot + '/public/css/skin.css', skinCss);
    }
    
    // lib
    writeFolder('lib');

    // grunt 
    var grunt = require('./templates/grunt-file').grunt;
    fs.writeFileSync('Gruntfile.js', grunt);

    callback(null);
};

function createViewsFolder(fullRoot, template) {
    writeFolder('views');
    writeFolder('views/layout');

    var viewIndex = require('./templates/' + template + '/index').index;
    writeFile(fullRoot + '/views/index.' + template, viewIndex);

    var layoutPath = './templates/' + template + '/layout'; 
    console.log(layoutPath);
    var layout = require(layoutPath).layout;
    var layoutFileName;
    if (template === 'jade') {
        layoutFileName = 'layout.jade';
    }
    else if (template === 'handlebars') {
        layoutFileName = 'layouts/main.handlebars';
    }
    if (layoutFileName) {
        writeFile(fullRoot + '/views/' + layoutFileName, layout);
    }
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

function createPackage(name, template) {
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
    if (template === 'jade') {
        pkg.dependencies.jade = 'latest';
    }
    else if (template === 'handlebars') {
        pkg.dependencies['express3-handlebars'] = 'latest';
    }

    writeFile('package.json', JSON.stringify(pkg, null, 4));
}


exports.KickStart = KickStart;



