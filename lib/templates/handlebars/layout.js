var heredoc = require('heredoc');

var layoutTemplate = heredoc(function () {/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <title>{{title}}</title>
    <meta name="description" content="" />
    <meta name="author" content="" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <link rel="stylesheet" type='text/css' href="http://yui.yahooapis.com/pure/0.2.1/pure-min.css"/>
    <link rel="stylesheet" href="/css/style.css"/>
    
    <script src="http://yui.yahooapis.com/3.12.0/build/yui/yui-min.js"></script>
</head>
<body>
    <div id="mainnav" class="pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed"> 
        <ul class="pure-menu-dark">
            <li class="pure-menu-active">
                <a href="/">Home</a>
            </li>
            <li>
                <a href="#">Other</a>
            </li>
        </ul>
    </div>
    {{{body}}}
</body>
</html>
*/});

exports.layout = layoutTemplate;