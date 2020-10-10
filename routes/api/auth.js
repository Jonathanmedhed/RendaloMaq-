const config = require('config');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   POST api/auth
// @desc   Authenticaate User & Get token
// @access  Public
router.post('/', [check('email', 'Please include a valid email').isEmail()], async (req, res) => {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// Get email from request body
	const { email } = req.body;

	try {
		// find user
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
		}

		// Return jsonwebtoken
		const payload = {
			user: {
				id: user.id,
			},
		};
		// Sign token
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
