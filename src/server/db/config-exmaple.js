module.exports = (function () {
	switch (process.env.NODE_ENV) {
		// Development
		case 'development':
		default:
			return {
				url: 'Your MongoDB URL'
			};
		// Production
		case 'production':
			return {
				url: null
			};
	}
}());
