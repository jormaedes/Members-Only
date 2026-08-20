import { Router } from "express";
import { becomeAdmin } from "../db/queries.js";

const becomeAdminRouter = Router();

becomeAdminRouter.get('/', (req, res) => {
	if (!req.isAuthenticated() || !req.user.is_member)
		return res.redirect('/');
	res.render('become_admin', { user: req.user, errorMsg: undefined });
})

becomeAdminRouter.post('/', async (req, res) => {
	if (!req.isAuthenticated() || !req.user.is_member || req.user.is_admin)
		return res.redirect('/');
	const { answer } = req.body;
	if (!answer.toLowerCase().includes('comb'))
		return res.render('become_admin', { user: req.user, errorMsg: 'Incorrect answer'});
	const id = req.user.id;
	await becomeAdmin(id);
	res.redirect('/');
})

export default becomeAdminRouter;