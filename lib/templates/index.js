var heredoc = require('heredoc');

var indexTemplate = heredoc(function () {/*
extends layout

block content
   .header.pure-u-1
       h1.pure-u-1= title
       h2.pure-u Kickstarted app
    .content
        p Welcome to #{title}
*/});

exports.index = indexTemplate;