var express = require('express'),
	app = express.createServer(),
	port = process.env.PORT || 3000;
	
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs'); 
	app.set("view options", {layout: false});
	app.register('.html', require('ejs'));
	app.use(express.methodOverride()); 
	app.use(express.bodyParser()); 
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));

});

app.get('/', function(req, res){
	
});

app.listen(port);
console.log('started server on port ' + port);