import { Router } from "express";
import { getAllPosts } from "../db/queries.js";
const indexRouter = Router();

indexRouter.get('/', async (req, res) => {
	try {
		const messages = await getAllPosts();
		res.render('index', { user: req.user, messages: messages });
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load messages.', details: err.message });
	}
});

export default indexRouter;