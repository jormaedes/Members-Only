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
	if (!req.isAuthenticated())
		return res.redirect('/');
	res.render('message', {user: req.user});
})

messageRouter.post('/', validatorMessage, async (req, res) => {
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
})

export default messageRouter;