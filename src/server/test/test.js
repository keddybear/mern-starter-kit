/* eslint-disable */
require('dotenv').config();

const { expect }	= require('chai');
const request 		= require('supertest');
const create 		= require('../create');
// const db 			= require('./db/connect');

const appName = 'MERN-STARTER-KIT';
const port = process.env.PORT || 8080;

describe(appName, function() {
	let app;
	let agent; // To persist session
	let server; // To close server
	let skip = false;
	let csrfToken;

	// Create Express server before testing
	before(function(done) {
		app = create();
		server = app.listen(port, (err) => {
			if (err) {
				done(err);
				return;
			}
			done();
		});
		agent = request.agent(app);
	});
	
	// Close Express server after testing
	after(function(done) {
		server.close();
		done();
	});

	beforeEach(function(done) {
		if (skip) this.skip();
		done();
	});

	afterEach(function(done) {
		if (this.currentTest.state === 'failed') skip = true;
		done();
	});

	it('Environment should be \'test\'', function(done) {
		expect(process.env.NODE_ENV).to.equal('test');
		done();
	});

	it('GET /api/session should send back a JSON object containing current session csrf token', function(done) {
		agent
			.get('/api/session')
			.set('Content-Type', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, function(err, res) {
				if (err) {
					done(err);
					return;
				}
				const { state: { csrf } } = res.body;

				expect(csrf)
					.to.exist
					.to.be.a('string');

				csrfToken = csrf; 
				done();
			});
	});

	it('GET /api/session again should send back the same csrf token', function(done) {
		agent
			.get('/api/session')
			.set('Content-Type', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, function(err, res) {
				if (err) {
					done(err);
					return;
				}
				const { state: { csrf } } = res.body;

				expect(csrf)
					.to.exist
					.to.be.a('string');
				expect(csrfToken)
					.to.equal(csrf);

				done();
			});
	});
});
