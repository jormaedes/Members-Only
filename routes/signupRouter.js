import { Router } from "express";
import validatorSign from "../validation/signValidator.js";
import bcrypt from "bcryptjs";
import { createUser } from "../db/queries.js";
import { validationResult } from "express-validator";

const signRouter = Router();

signRouter.get('/', (req, res) => {
	try {
		if (req.isAuthenticated())
			return res.redirect('/');
		res.render('sign-up');
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load user.', details: err.message });
	}
})

signRouter.post('/', validatorSign, async (req, res) => {
	try {
		const { firstName, lastName, username, password, confirmPassword } = req.body;
		if (password !== confirmPassword)
			return res.status(400).render('error', { status: 400, message: 'Password is not equal' });
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('error', { status: 400, message: 'Validation failed.', errors: errors.array() });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		await createUser(firstName, lastName, username, hashedPassword);
		res.redirect('/login');
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load user.', details: err.message });
	}
})

export default signRouter;