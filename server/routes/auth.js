const express = require('express');
const {hash, compare} = require('bcrypt');
const {generateJWT, generateEmailJWT, completeJWT, emailJWT} = require('../utils/jwt');
const {requiredBodyProps, validatePassword} = require('../middle-ware/validateYoutube');
const {sendRegistrationEmail} = require('../utils/mailer/');
const {resendRegistration, confirmRegistration} = require('../middle-ware/registration');
const {nextError, duplicateError, errorIf, errorIfNull, errorIfInactiveUser} = require('../utils/errors');
const {tap} = require('../utils/func');

const {User} = require('../modals/User');

const createToken = generateJWT({expiresIn: '1d'});
const emailTokenFn = generateEmailJWT({expiresIn: '1d'});

const router = express.Router();

const getProp = prop => obj => obj[prop];
const toObj = prop => value => ({[prop]: value});
const merge = obj1 => obj2 => ({...obj1, ...obj2});
const success = (status, res) => data => res
	.status(status)
	.json(data);
const end = (status, res) => () => res.status(status).end();
const errorIfWrongPassword = errorIf(([valid]) => !valid);
const redirect = (url, res) => () => res.redirect(url);

router.post(
	'/register', 
	[requiredBodyProps(['password', 'email']), resendRegistration], 
	validatePassword,
	(req, res, next) => {
		const {password, email} = req.body;
		return hash(password, 10)
			.then(toObj('password'))
			.then(merge({email}))
			.then(data => User.create(data))
			.then(emailJWT(email, emailTokenFn))
			.then(sendRegistrationEmail(req, email))
			.then(end(201, res))
			.catch(duplicateError(`${email} is already registered.`, next))
			.catch(nextError(500, 'Registration cannot be completed.', next));
	}
);

router.post(
	'/login',
	requiredBodyProps(['password', 'email']),
	(req, res, next) => {
		const {password, email} = req.body;
		return User.findOne({email})
			.then(errorIfNull(401, 'Incorrect email or password.'))
			.then(errorIfInactiveUser(401, 'Registration is incomplete. Check email to continue.'))
			.then(user => Promise.all([compare(password, user.password), user]))
			.then(errorIfWrongPassword(401, 'Incorrect email or password.'))
			.then(getProp(1))
			.then(completeJWT(req, res, createToken))
			.then(end(200, res))
			.catch(next);
	}
);

router.get('/register/confirm/:jwt', confirmRegistration, (req, res, next) => {
	return Promise.resolve(req.user)
		.then(completeJWT(req, res, createToken))
		.then(redirect(`${process.env.HOME_URL}?newUser=1`, res));
});

module.exports = router;
