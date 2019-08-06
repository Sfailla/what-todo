const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const TodoSchema = new mongoose.Schema({
	_creator: {
		type: ObjectId,
		required: true
	},
	text: {
		type: String,
		unique: true,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Date,
		default: null
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

const Todo = mongoose.model('Todos', TodoSchema);

module.exports = Todo;
