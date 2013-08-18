#!/usr/bin/env node

var sys = require("util"),
    fs = require('fs'),
    path = require('path'),
    KickStart = require("../lib/kickstart").KickStart,
    skinCss = require('../lib/skin').skin,
    rootDir = '',
    fullRoot = '';

var kick = new KickStart();

var args = process.argv.slice(0);
args.shift(); 
args.shift();
rootDir = args[0];

fullRoot = path.join(process.cwd() , rootDir);
var asciify = require('asciify'); 
asciify("KickStart",  function (ascii) {
    console.log(ascii.toString());   

    kick.build({rootDirectory: rootDir, fullRootDirectory: fullRoot}, function(err,result) {
        console.log('Finished setup');
        console.log('Now run npm install in project directory');
    }); 
});
