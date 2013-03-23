var heredoc = require('heredoc');

var indexTemplate = heredoc(function () {/*
extends layout

block content
   .header.yui3-u-1
       h1.yui3-u-1= title
       h2.yui3-u Kickstarted app
    .content
        p Welcome to #{title}
*/});

exports.index = indexTemplate;