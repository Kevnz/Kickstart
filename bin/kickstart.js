#!/usr/bin/env node

var sys = require("util"),
    fs = require('fs'),
    path = require('path'),
    KickStart = require("../lib/kickstart").KickStart,
    skinCss = require('../lib/skin').skin,
    rootDir = '',
    fullRoot = '';
var argv = require('optimist').argv;
var kick = new KickStart();

var args = process.argv.slice(0);
console.log(argv._);
args.shift(); 
args.shift();
rootDir = args[0];

var template = argv.t || '';
console.log(template);

fullRoot = path.join(process.cwd() , rootDir);
var asciify = require('asciify'); 
asciify("KickStart", function (err, ascii) {
    console.log(ascii.toString()); 

    kick.build({rootDirectory: rootDir, fullRootDirectory: fullRoot, template:template}, function(err,result) {
        console.log('Finished setup');
        console.log('Now run npm install in project directory');
    }); 
});
