var heredoc = require('heredoc');

var indexTemplate = heredoc(function () {/*
<div class="header pure-u-1">
    <h1 class="pure-u-1">{{title}}
    <h2 class="pure-u">Kickstarted app</h2>
    <div class="content">
        <p> Welcome to {{title}}</p>
    </div>
</div>
*/});

exports.index = indexTemplate;