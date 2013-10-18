#!/usr/bin/env node

var sys = require("util"),
    fs = require('fs'),
    path = require('path'),
    KickStart = require("../lib/kickstart").KickStart,
    skinCss = require('../lib/skin').skin;

var argv = require('optimist')
    .default('t', 'handlebars')
    .default('p', 'sass')
    .argv;

if (argv.help || argv.h) {
    displayHelp();
    return;
}

var asciify = require('asciify');
asciify("KickStart", function (err, ascii) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(ascii.toString());
    console.log(argv.template);

    createRoot(process.argv.slice(0), function createRootCallback (root, fullRoot) {
        var kick = new KickStart();

        var template = argv.template;
        if (!template) template = argv.t;	//	defaults to 'jade'

        var pre = argv.pre;
        if (!pre) pre = argv.p;			//	defaults to 'sass'

        var templateEngine = createTemplateEngine(template);

        kick.build({rootDirectory: root, fullRootDirectory: fullRoot, template: templateEngine, precompiler: pre}, function buildCallback (err,result) {
            console.log('--------------');
            console.log('Finished setup');
            console.log('Now run npm install and bower install in project directory');
        });
    });
});

//  we expect args to look like: node,/usr/local/bin/kickstart,<filename>
//  so: shift 2 to the right to get <filename>
function createRoot(args, callback) {
    args.shift();
    args.shift();
    var root = args[0];
    var fullRoot = path.join(process.cwd() , root);

    callback(root, fullRoot);
}

function createTemplateEngine(templateName) {
    //todo: err handling?
    return require('../lib/templates/'+templateName+'/template').template;
}


function displayHelp() {
  console.log('');
  console.log('  Usage: Kickstart [options] <project name>');
  console.log('');
  console.log('  Options:');
  console.log('');
  console.log('    -t, --template   specify the template. (jade|handlebars|ejs) (defaults to handlebars)');
  console.log('    -p, --pre        specify the css procompiler. (sass|less|none) (defaults to sass)');
  console.log('');
}

