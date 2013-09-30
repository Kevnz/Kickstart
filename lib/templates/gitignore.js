var heredoc = require('heredoc');

var gitignore = heredoc(function () {/*
node_modules
.idea
.sass-cache
*/});

exports.gitignore = gitignore;