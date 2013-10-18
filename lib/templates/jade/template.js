exports.template = function() {
	return {
		name: 'jade',

		app: function() {
			return require('./app').app;
		},

		viewIndex: function() {
			return require('./index').index;
		},

		layout: function() {
			return require('./layout.js').layout;
		},

		layoutFileName: 'layout.jade'
	}
}

