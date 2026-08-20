import { Router } from "express";
import { getPostById, deletePostById } from "../db/queries.js";

const deleteMessageRouter = Router();

deleteMessageRouter.get('/:id/delete', (req, res) => {
	try {

	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load messages.', details: err.message });
	}
	if (!req.isAuthenticated() || !req.user.is_admin)
		res.redirect('/');
	const { id } = req.params;
	res.redirect(`/messages/${id}/confirm-delete`);
})

deleteMessageRouter.get('/:id/confirm-delete', async (req, res) => {
	try {
		if (!req.isAuthenticated() || !req.user.is_admin)
			res.redirect('/');
		const { id } = req.params;
		const msg = await getPostById(id);
		if (!msg)
			res.redirect('/');
		res.render('delete_message', { message: msg });
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load messages.', details: err.message });
	}

})

deleteMessageRouter.post('/:id/confirm-delete', async (req, res) => {
	try {
		if (!req.isAuthenticated() || !req.user.is_admin)
			res.redirect('/');
		const { id } = req.params;
		const msg = await getPostById(id);
		await deletePostById(id);
		res.redirect('/');
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load messages.', details: err.message });
	}
})

export default deleteMessageRouter;