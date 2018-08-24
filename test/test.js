/* eslint-disable */
require('dotenv').config();

const { expect }	= require('chai');
const request 		= require('supertest');
const create 		= require('../src/server/create');
// const db 			= require('./db/connect');

const appName = 'MERN-STARTER-KIT';
const port = 8080;

describe(appName, function() {
	let app;
	let skip = false;

	// // Create Express server before testing
	// before(function(done) {
	// 	app = create();
	// 	app.listen(port, (err) => {
	// 		if (err) {
	// 			done(err);
	// 			return;
	// 		}
	// 		done();
	// 	});
	// });

	before('before', function(done) {
		done();
	});

	after('after', function(done) {
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

	it('This test should not run', function(done) {
		done();
	});

	// it('/api/session should send back a JSON object containing current session info', function(done) {
	// 	request(app)
	// 		.get('/api/session')
	// 		.set('Content-Type', 'application/json')
	// 		.expect('Content-Type', /json/)
	// 		.expect(200, function(err, res) {
	// 			if (err) {
	// 				done(err);
	// 				return;
	// 			}
	// 			const { csrf } = res.body;
	// 			expect(csrf)
	// 				.to.exist
	// 				.to.be.a('string');
	// 			done();
	// 		});
	// });

	// User
	// describe('Users', function() {
	// 	let User;

	// 	// Before testing, connect to mongodb
	// 	before(function(done) {

	// 	});

	// 	// After testing, disconnect from mongodb
	// 	after(function(done) {

	// 	});
	// })

});

/*
	1. Register a new user
	2. Should be authenticated
*/

/*
	1. Log out
	2. Should be unauthenticated
*/

/*
	1. Register a new user with the same username
	2. Registration should fail
*/

/*
	1. Log in
	2. Should be authenticated
*/
