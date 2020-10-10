const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

// @route   DELETE api/users/email
// @desc    Delete an user
// @access  Public
router.delete('/:email', async (req, res) => {
	try {
		//Make sure User exists
		const user = await User.find({ email: req.params.email });
		if (!user) {
			return res.status(404).json('User not found');
		}

		// remove user
		await user[0].remove();

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route GET api/users/
// @desc Get users
// @access public
router.get('/', async (req, res) => {
	try {
		let user = await User.find();
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', async (req, res) => {
	const { name, email } = req.body;
	try {
		// Check if email is in use already
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
		}

		// Create user object
		user = new User({
			name,
			email,
		});
		// Save new user in database
		await user.save();

		// Return jsonwebtoken
		const payload = {
			user: {
				id: user.id,
			},
		};
		// Sign jwt
		jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
