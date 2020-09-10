const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
// const Todo = require('../models/todos')
const authenticate = require('../middleware/authenticate');

const server = express.Router();

server.get('/me', authenticate, (req, res) => {
	res.send(req.user);
});
// route for creating a new USER
server.post('/', (req, res) => {
	const body = _.pick(req.body, [ 'email', 'password' ]);
	const user = new User(body);
	// the way this is set up; when a user logs in they are given a token
	// then they are automatically logged in.  when they log out and it deletes
	// their token. they get there token back when they hit the login route...
	user
		.save()
		.then(user => {
			return user.generateAuthToken();
		})
		.then(token => {
			res.header('x-auth', token).send(user);
		})
		.catch(err => res.status(400).send(err));
});
// route for logging in
server.post('/login', (req, res) => {
	const body = _.pick(req.body, [ 'email', 'password' ]);
	User.findByCredentials(body.email, body.password)
		.then(user => {
			user.generateAuthToken().then(token => {
				res.header('x-auth', token).send(user);
			});
		})
		.catch(err => res.status(400).send(err));
});
// route to delete token
server.delete('/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(
		() => {
			res.status(200).send();
		},
		() => {
			res.status(400).send();
		}
	);
});

module.exports = server;
