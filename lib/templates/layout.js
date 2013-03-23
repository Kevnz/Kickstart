var heredoc = require('heredoc');

var layoutTemplate = heredoc(function () {/*
doctype 5
html
    head
        meta(charset='utf-8')
        title= title
        meta(name='viewport', content='width=device-width; initial-scale=1.0; maximum-scale=1.0;')
        link(rel='stylesheet', href='/css/style.css')
        link(rel='stylesheet', type='text/css', href='http://yui.yahooapis.com/3.9.0/build/cssnormalize/cssnormalize-min.css')
        link(rel='stylesheet', type='text/css', href='http://yui.yahooapis.com/3.9.0/build/cssgrids-responsive/cssgrids-responsive-min.css')
        link(rel='stylesheet', type='text/css', href='http://yui.yahooapis.com/3.9.0/build/cssbutton/cssbutton-min.css')
        link(rel='stylesheet', type='text/css', href='http://yui.yahooapis.com/gallery-2013.03.13-20-05/build/gallerycss-csslist/gallerycss-csslist-min.css')
        link(rel='stylesheet', type='text/css', href='http://yui.yahooapis.com/gallery-2013.03.13-20-05/build/gallerycss-cssform/gallerycss-cssform-min.css')
        link(rel='stylesheet', type='text/css', href='http://yui.yahooapis.com/gallery-2013.03.13-20-05/build/gallerycss-csstable/gallerycss-csstable-min.css')
        link(rel='stylesheet', type='text/css', href='http://yui.yahooapis.com/gallery-2013.03.13-20-05/build/gallerycss-cssextras/gallerycss-cssextras-min.css')
        link(rel='stylesheet', type='text/css', href='https://rawgithub.com/tilomitra/yuicss-common/master/ui.css')

        script(src='http://yui.yahooapis.com/3.8.0/build/yui/yui-min.js')
    body.yui3-skin-sam
        #mainnav.yui3-menu.yui3-menu-open.yui3-menu-horizontal.yui3-menu-fixed
            ul.yui3-menu-dark
                li.yui3-menu-active
                    a(href='/' ) Home
                li
                    a(href='' ) Other
        block content
        script
            YUI().use('node-base', 'event-base', function (Y) {
                
            });
        script(type='text/javascript', src='//use.typekit.net/ajf8ggy.js')
        script(type='text/javascript')
            try{Typekit.load();}catch(e){}
*/});

exports.layout = layoutTemplate;