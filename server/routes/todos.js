const express = require('express');
const _ = require('lodash');

const { mongoose } = require('../db/mongoose');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const Todo = require('../models/todo');
const authenticate = require('../middleware/authenticate');

const server = express.Router();

// route for making a TODO
server.post('/', authenticate, (req, res) => {
	const todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});
	todo
		.save()
		.then(doc => res.send(doc))
		.catch(err => res.status(400).send(err));
});
// route for listing all TODOs
server.get('/', authenticate, (req, res) => {
	Todo.find({ _creator: req.user._id })
		.then(todos => res.send({ todos }))
		.catch(err => res.status(400).send(err));
});
// route to delete all todos for auth user
server.delete('/removeAll', authenticate, (req, res) => {
	Todo.remove({ _creator: req.user._id })
		.then(todos => res.send({ todos: [] }))
		.catch(err => res.status(400).send(err));
});
// route for single TODO by ID
server.get('/:id', authenticate, (req, res) => {
	const _id = req.params.id;
	const _creator = req.user._id;

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findOne({ _id, _creator })
		.then(todo => {
			if (!todo) return res.status(400).send();
			res.send({ todo });
		})
		.catch(err => res.status(400).send(err));
});
// route for removing TODO by ID
server.delete('/:id', authenticate, (req, res) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id)
		.then(todo => {
			if (!todo) return res.status(404).send('todo not found');
			res.status(200).send(todo);
		})
		.catch(err => res.status(400).send(err));
});
// route to compolete or update a todo
server.patch('/:id', authenticate, (req, res) => {
	const { id } = req.params;
	const body = _.pick(req.body, [ 'text', 'completed' ]);

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	} else if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findOneAndUpdate(
		{ _id: id, _creator: req.user._id },
		{ $set: body },
		{ new: true }
	)
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			} else {
				res.send({ todo });
			}
		})
		.catch(err => res.status(404).send(err));
});

module.exports = server;
