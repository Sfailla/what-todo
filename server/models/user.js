require('../config/config');

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: value => {
				return validator.isEmail(value);
			},
			message: '{VALUE} is not a valid email address'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 4
	},
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	],
	created_at: {
		type: Date,
		default: Date.now
	}
});

// Instance Methods

// tells the model what info to send back when the
// model is converted to JSON. (we can override here using methods)
// obviously we only want to send info that we need to access and
// not everything
UserSchema.methods.toJSON = function() {
	const userObj = this.toObject();
	return _.pick(userObj, [ '_id', 'email', 'tokens[0].token' ]);
};

UserSchema.methods.generateAuthToken = function() {
	const access = 'auth';
	const token = jwt
		.sign({ _id: this._id.toHexString(), access }, process.env.JWT_SECRET)
		.toString();
	this.tokens = [];
	this.tokens = this.tokens.concat([ { access, token } ]);
	return this.save().then(() => token);
};
UserSchema.methods.removeToken = function(token) {
	const user = this;
	return user.update({
		$pull: {
			tokens: { token }
		}
	});
};
// statics is similar to methods, except everything you add on to it
// becomes a model method rather than an instance method
UserSchema.statics.findByToken = token => {
	// instance methods get called with the individual document,
	// model methods get called with the model as the this binding
	let decoded;

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}

	const auth = 'auth';

	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': auth
	});
};

UserSchema.statics.findByCredentials = (email, password) => {
	return User.findOne({ email }).then(user => {
		if (!user) {
			return Promise.reject();
		}
		// use a promise here to send user back
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};
// mongoose middleware can run before or after a doc is inserted
// into the database
UserSchema.pre('save', function(next) {
	if (this.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(this.password, salt, (err, hash) => {
				this.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
