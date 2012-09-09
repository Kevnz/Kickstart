#!/usr/bin/env node

var sys = require("util"),
	fs = require('fs'),
	path = require('path'),
	KickStart = require("../lib/kickstart"),
	rootDir = '',
	fullRoot = '',
	execRoot =  process.platform === "win32" ? __filename.replace('bin\\kickstart.js', '') : __filename.replace('bin/kickstart.js', '');

var args = process.argv.slice(0);
args.shift(); args.shift();

rootDir = args[0];
console.log(process.cwd());
console.log('The ExecRoot' + execRoot);
console.log('__filename ' +__filename);
fullRoot = path.join(process.cwd() , rootDir);
fs.mkdirSync(rootDir);

process.chdir(rootDir);
fs.writeFileSync('package.json', fs.readFileSync(path.join(execRoot , '/resources/package.json')));
fs.mkdirSync('views');
fs.mkdirSync('public');
fs.mkdirSync('lib');

fs.writeFileSync('app.js', fs.readFileSync(path.join(execRoot , '/resources/app.js')));
fs.writeFileSync('package.json', fs.readFileSync(path.join(execRoot, '/resources/package.json')));
process.chdir(fullRoot);

