var heredoc = require('heredoc');

var resourceTemplate = heredoc(function () {/*

exports.index = function(req, res){
    res.send('index');
};

exports.new = function(req, res){
    res.send('new');
};

exports.create = function(req, res){
    res.send('create');
};

exports.show = function(req, res){
    res.send('show');
};

exports.edit = function(req, res){
    res.send('edit');
};

exports.update = function(req, res){
    res.send('update');
};

exports.destroy = function(req, res){
    res.send('destroy');
};

exports.load = function(id, fn){
 
};
*/});

exports.routes = routesTemplate;