import { Router } from "express";
import { becomeAdmin } from "../db/queries.js";

const becomeAdminRouter = Router();

becomeAdminRouter.get('/', (req, res) => {
	try {
		if (!req.isAuthenticated() || !req.user.is_member || req.user.is_admin)
			return res.redirect('/');
		res.render('become_admin', { user: req.user, errorMsg: undefined });
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load user.', details: err.message });
	}
})

becomeAdminRouter.post('/', async (req, res) => {
	try {
		if (!req.isAuthenticated() || !req.user.is_member || req.user.is_admin)
			return res.redirect('/');
		const { answer } = req.body;
		if (!answer.toLowerCase().includes('comb'))
			return res.render('become_admin', { user: req.user, errorMsg: 'Incorrect answer' });
		const id = req.user.id;
		await becomeAdmin(id);
		res.redirect('/');
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load user.', details: err.message });
	}
})

export default becomeAdminRouter;