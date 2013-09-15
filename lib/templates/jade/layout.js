var heredoc = require('heredoc');

var layoutTemplate = heredoc(function () {/*
doctype 5
html
    head
        meta(charset='utf-8')
        title= title
        meta(name='viewport', content='width=device-width; initial-scale=1.0; maximum-scale=1.0;')
        link(rel='stylesheet', href='/css/style.css')
        link(rel='stylesheet', type='text/css', href='http://yui.yahooapis.com/pure/0.1.0/pure-min.css')
        script(src='http://yui.yahooapis.com/3.11.0/build/yui/yui-min.js')
    body.yui3-skin-sam
        #mainnav.pure-menu.pure-menu-open.pure-menu-horizontal.pure-menu-fixed
            ul.pure-menu-dark
                li.pure-menu-active
                    a(href='/' ) Home
                li
                    a(href='' ) Other
        block content
        script.
            YUI().use('node-base', 'event-base', function (Y) {
                
            });
*/});

exports.layout = layoutTemplate;
