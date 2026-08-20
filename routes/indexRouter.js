import { Router } from "express";
import { getAllPosts } from "../db/queries.js";
const indexRouter = Router();

indexRouter.get('/', async (req, res) => {
	const messages = await getAllPosts();
	res.render('index', { user: req.user, messages: messages });
});

export default indexRouter;