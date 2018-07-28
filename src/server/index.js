const express 		= require('express');
const session 		= require('express-session');
const RedisStore 	= require('connect-redis')(session);
// const morgan 		= require('morgan');
const path 			= require('path');

const db 			= require('./db/connect');
const routes 		= require('./routes');
const conf 			= require('./config');

const app = express();
const port = 8080;

// Middlewares
app.use(session({
	store: new RedisStore(conf.redisOptions),
	secret: conf.sessionSecret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		path: '/',
		httpOnly: true,
		secure: false, // Need HTTPS for true
		maxAge: null
	}
}));
app.use((req, res, next) => {
	if (!req.session) {
		res.status(500).json({
			response: 'RedisConnectionError',
			name: 'Redis Connection Error',
			url: req.url,
			type: '',
			msg: 'Unable to connect to Redis',
			extra: null
		});
		return;
	}
	next();
});

app.use(express.static('dist'));

// Routing
app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}!`));

process.on('SIGINT', () => {
	db.close(() => {
		console.log('MongoDB disconnected through app termination');
		process.exit(0);
	});
});
