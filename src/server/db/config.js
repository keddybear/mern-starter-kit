module.exports = (function () {
	switch (process.env.NODE_ENV) {
		// Development
		case 'development':
		default:
			return {
				url: process.env.DB_DEV_URL
			};
		// Production
		case 'production':
			return {
				url: null
			};
	}
}());
