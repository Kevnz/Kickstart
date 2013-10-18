exports.template = function() {
	return {
		name: 'handlebars',

		app: function() {
			return require('./app').app;
		},

		viewIndex: function() {
			return require('./index').index;
		},

		layout: function() {
			return require('./layout.js').layout;
		},

		layoutFileName: 'layouts/main.handlebars'
	}
}
