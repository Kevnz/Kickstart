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
/**
 * Initial Route.
 */
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

var baseCSS = [
    '.header {',
    '   background: rgb(42, 117, 185);',
    '}',
    '.header h2 {',
    '    color: rgb(6, 58, 114);',
    '}',
    '.yui3-menu {',
    '    margin-bottom:15px;',
    '}'
].join(eol);

/**
 * Jade layout template.
 */
var layout = [
    'doctype 5',
    'html',
    '    head',
    '        title= title',
    '        link(rel=\'stylesheet\', href=\'/css/style.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'http://necolas.github.com/normalize.css/1.0.2/normalize.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'https://rawgithub.com/tilomitra/csslist/master/css/list-core.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'https://rawgithub.com/tilomitra/csslist/master/css/list.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'https://rawgithub.com/tilomitra/csslist/master/css/list-responsive.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'https://rawgithub.com/tilomitra/csslist/master/css/list-paginator.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'http://yui.yahooapis.com/3.8.0/build/cssbutton/cssbutton-min.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'https://rawgithub.com/tilomitra/yuicss-common/master/ui.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'http://tilomitra.github.com/cssextras/cssextras.css\')',
    '        link(rel=\'stylesheet\', type=\'text/css\', href=\'http://yui.yahooapis.com/3.8.0/build/cssbutton/cssbutton-min.css\')',
    '        script(src=\'http://yui.yahooapis.com/3.8.0/build/yui/yui-min.js\')',
    '    body.yui3-skin-sam',
    '        #mainnav.yui3-menu.yui3-menu-open.yui3-menu-horizontal.yui3-menu-fixed',
    '            ul.yui3-menu-dark',
    '                li.yui3-menu-active',
    '                    a(href=\'\' ) Home',
    '                li',
    '                    a(href=\'\' ) Other',
    '        block content',
    '        script',
    '            YUI().use(\'node-base\', \'event-base\', function (Y) {',
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
    '   .header',
    '       h1= title',
    '       h2 Kickstarted app',
    '    p Welcome to #{title}'
].join(eol);

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