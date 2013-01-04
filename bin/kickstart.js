#!/usr/bin/env node

var sys = require("util"),
    fs = require('fs'),
    path = require('path'),
    KickStart = require("../lib/kickstart"),
    rootDir = '',
    fullRoot = '',
    os = require('os'),
    mkdirp = require('mkdirp'), 
    execRoot =  process.platform === "win32" ? __filename.replace('bin\\kickstart.js', '') : __filename.replace('bin/kickstart.js', ''),
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

var args = process.argv.slice(0);
args.shift(); args.shift();

rootDir = args[0];

fullRoot = path.join(process.cwd() , rootDir);
fs.mkdirSync(rootDir);

process.chdir(rootDir);

//package.json
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
fs.mkdirSync('lib');
fs.mkdirSync('routes');
fs.mkdirSync('models');

var app = [
    '',
    'var express = require(\'express\'),',
    '    routes = require(\'./routes\'),',
    '    http = require(\'http\'),',
    '    path = require(\'path\');',
    '',
    'var app = express();',
    '',
    'app.configure(function(){',
    '    app.set(\'port\', process.env.PORT || 3000);',
    '    app.set(\'views\', __dirname + \'/views\');',
    '    app.set(\'view engine\', \'jade\');',
    '    app.use(express.favicon());',
    '    app.use(express.logger(\'dev\'));',
    '    app.use(express.bodyParser());',
    '    app.use(express.methodOverride());',
    '    app.use(app.router);',
    '    app.use(express.static(path.join(__dirname, \'public\')));',
    '});',
    '',
    'app.configure(\'development\', function(){',
    '    app.use(express.errorHandler());',
    '    app.locals.pretty = true;',
    '});',
    '',
    'app.get(\'/\', routes.index);',
    '',
    'http.createServer(app).listen(app.get(\'port\'), function(){',
    '    console.log("Express server listening on port " + app.get(\'port\') + " in " + app.get(\'env\') +" mode");',
    '});',
    ''
].join(eol);

var indexRoute = [
    '',
    '/*',
    ' * GET home page.',
    ' */',
    '',
    'exports.index = function(req, res){',
    '  res.render(\'index\', { title: \'Kickstarted App\' });',
    '};'
].join(eol);

var layout = [
    'doctype 5',
    'html',
    '    head',
    '        title= title',
    '        link(rel=\'stylesheet\', href=\'/css/style.css\')',
    '        link(rel=\'stylesheet\', href=\'http://yui.yahooapis.com/3.8.0/build/cssreset/cssreset-min.css\')',
    '        link(rel=\'stylesheet\', href=\'http://yui.yahooapis.com/3.8.0/build/cssfonts/cssfonts-min.css\')',
    '        link(rel=\'stylesheet\', href=\'http://yui.yahooapis.com/3.8.0/build/cssbase/cssbase-min.css\')',
    '        script(src=\'http://yui.yahooapis.com/3.8.0/build/yui/yui-min.js\')',
    '    body.yui3-skin-sam',
    '        #mainnav.yui3-menu.yui3-menu-horizontal',
    '            .yui3-menu-content',
    '                ul',
    '                    li.yui3-menuitem(role=\'presentation\')',
    '                        a.yui3-menuitem-content(href=\'\', role=\'menuitem\', tabindex=\'0\') Home',
    '                        a.yui3-menuitem-content(href=\'\', role=\'menuitem\', tabindex=\'0\') Other',
    '        block content',
    '        script',
    '            YUI().use(\'node-base\', \'event-base\', \'node-menunav\', function (Y) {',
    '                ',
    '            });'
].join(eol);

/**
 * Jade index template.
 */

var viewIndex = [
    'extends layout',
    '',
    'block content',
    '    h1= title',
    '    p Welcome to #{title}'
].join(eol);

fs.writeFileSync('app.js', app);

write(fullRoot + '/routes/index.js', indexRoute);
write(fullRoot + '/views/layout.jade', layout);
write(fullRoot + '/views/index.jade', viewIndex);
//css template to be added later
write(fullRoot + '/public/css/style.css', '');
console.log('Finished setup');
console.log('Now run npm install in project directory');

