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

console.log('the cli version');
console.log(args);
console.log(__filename);

console.log('make root directory');
console.log(process.cwd() + '/' + args[0]);

rootDir = args[0];
fullRoot =process.cwd() + '/' + rootDir;
fs.mkdirSync(rootDir);

process.chdir(rootDir);
fs.writeFileSync('package.json', fs.readFileSync(execRoot + '/resources/package.json'));
fs.mkdirSync('views');
fs.mkdirSync('public');
fs.mkdirSync('lib');
//TODO: figure out how to pull the file contents out of the module dir when I will be in the new dir
fs.writeFileSync('app.js', fs.readFileSync(execRoot + '/resources/app.js'));
fs.writeFileSync('package.json', fs.readFileSync(execRoot + '/resources/package.json'));
process.chdir(fullRoot);

//Tell the library to do the heavy lifting