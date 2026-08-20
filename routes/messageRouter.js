import { Router } from "express";
import { body, validationResult } from "express-validator";
import { InsertPost } from "../db/queries.js";

const validatorMessage = [
	body('title')
		.trim()
		.notEmpty()
		.withMessage('Title must not be empty'),

	body('message')
		.trim()
		.notEmpty()
		.withMessage('Message must not be empty')
]

const messageRouter = Router();

messageRouter.get('/', (req, res) => {
	try {
		if (!req.isAuthenticated())
			return res.redirect('/');
		res.render('message', { user: req.user });
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load user.', details: err.message });
	}
})

messageRouter.post('/', validatorMessage, async (req, res) => {
	try {
		if (!req.isAuthenticated())
			return res.redirect('/');
		const { title, message } = req.body;
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).render('error', { status: 400, message: 'Validation failed.', errors: errors.array() });
		}
		const id = req.user.id;
		const row = await InsertPost(title, message, id);
		res.redirect('/');
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load user.', details: err.message });
	}
})

export default messageRouter;