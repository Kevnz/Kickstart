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
    var template = config.template();
    var precompiler = config.precompiler;

    writeFolder(rootDir);
    process.chdir(rootDir);

    // app.js
    var app = template.app();
//    var app = require('./templates/'+ template + '/app').app;
    writeFile('', 'app.js', app);
    // .gitignore file
    var git = require('./templates/gitignore').gitignore;
    writeFile('', '.gitignore', git);less
    // package.json
    createPackage(rootDir, template.name);
    //bower.json
    createBowerPackage(rootDir);
    // README.md
    var readme = [rootDir, '===', , '### About', , 'Write a readme for your app here'].join(eol);
    writeFile('', 'README.md', readme);

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
    writeFile(fullRoot, '/routes/index.js', indexRoute);

    var style = require('./templates/'+precompiler).styles;
    if (precompiler === 'sass') {
        writeFolder('sass');

        var sassConfig = require('./templates/config-rb').sass;
        writeFile('', 'config.rb', sassConfig);

        // todo: idiomatic sass?
        writeFile(fullRoot, '/sass/style.scss', style);
    }
    else if (precompiler === 'less') {
        writeFolder('less');
        writeFile(fullRoot, '/less/style.less', style);
    }
    else {
        // none / not recognised...
        writeFile(fullRoot, '/public/css/style.css', style);
        //writeFile(fullRoot + '/public/css/skin.css', skinCss);
    }
    
    // lib
    writeFolder('lib');

    // grunt 
    var grunt = require('./templates/grunt-file').grunt;
    writeFile('', 'Gruntfile.js', grunt);

    callback(null);
};

function createViewsFolder(fullRoot, template) {
    writeFolder('views');
    writeFolder('views/layouts');

    writeFile(fullRoot, '/views/index.' + template.name, template.viewIndex());
    writeFile(fullRoot, '/views/' + template.layoutFileName, template.layout());
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

function writeFile(folder, file, contents) {
    var fullPath = folder + file;
    fs.writeFileSync(fullPath, contents);
    console.log('create: ' + file);
}
function createBowerPackage (name) {
    var pkg = {
        name: name,
        version: '0.0.1',
        private: true,
        ignore: [
            '**/.*',
            'node_modules',
            'bower_components',
            'test',
            'tests'
        ],
        dependencies: {
            'pure-typography': 'latest',
            'pure-extras': 'latest'
        }
    };
    writeFile('', 'bower.json', JSON.stringify(pkg, null, 4));
}
function createPackage (name, template) {
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
            "grunt-contrib-copy": "~0.4.1",
            "grunt-bower": "~0.7.0"
        }
    };
    if (template === 'jade') {
        pkg.dependencies.jade = 'latest';
    }
    else if (template === 'handlebars') {
        pkg.dependencies['express3-handlebars'] = 'latest';
    }

    writeFile('', 'package.json', JSON.stringify(pkg, null, 4));
}


exports.KickStart = KickStart;



