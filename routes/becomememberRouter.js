import { Router } from "express";
import { becomeMember } from "../db/queries.js";

const memberRouter = Router();

memberRouter.get('/', (req, res) => {
	if (!req.isAuthenticated() || req.user.is_member)
		return res.redirect('/');
	res.render('become_member', { user: req.user, errorMsg: undefined });
})

memberRouter.post('/', async (req, res) => {
	if (!req.isAuthenticated() || req.user.is_member)
		return res.redirect('/');
	const { answer } = req.body;
	if (!answer.toLowerCase().includes('clock'))
		return res.redirect('become_member', { user: req.user, errorMsg: 'Incorrect answer'});
	const id = req.user.id;
	await becomeMember(id);
	res.redirect('/');
})

export default memberRouter;