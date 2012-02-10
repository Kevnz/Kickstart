#!/usr/bin/env node

var sys = require("util"),
	fs = require('fs'),
	KickStart = require("../lib/kickstart"),
	rootDir = '',
	fullRoot = '',
	execRoot = __filename.replace('bin/kickstart.js', '');

var args = process.argv.slice(0);
// shift off node and script name
args.shift(); args.shift();

rootDir = args[0];
fullRoot =process.cwd() + '/' + rootDir;
fs.mkdirSync(rootDir);

process.chdir(rootDir);
fs.writeFileSync('package.json', fs.readFileSync(execRoot + '/resources/package.json'));
fs.mkdirSync('views');
fs.mkdirSync('public');
fs.mkdirSync('lib');

fs.writeFileSync('app.js', fs.readFileSync(execRoot + '/resources/app.js'));
fs.writeFileSync('package.json', fs.readFileSync(execRoot + '/resources/package.json'));
process.chdir(fullRoot);

