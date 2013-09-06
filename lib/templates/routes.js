var heredoc = require('heredoc');

var routesTemplate = heredoc(function () {/*
exports.index = function(req, res){
  res.render('index', { title: 'Kickstarted App' });
};
*/});

exports.routes = routesTemplate;