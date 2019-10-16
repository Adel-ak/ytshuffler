const {Schema, model} = require('mongoose');
const {validate: isEmail} = require('email-validator');
const validatePassword = require('../utils/password');

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: value => isEmail(value),
			message: 'Email is not valid.'
		}
	},
	password: {
		type: String,
		required: true
	},
	settings: {
		playmode: {
			type: String,
			default: 'date'
		}
	}
});

const User = model('User', userSchema);

module.exports = {User, userSchema};
