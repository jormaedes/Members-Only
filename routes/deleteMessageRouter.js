import { Router } from "express";
import { getPostById, deletePostById } from "../db/queries.js";

const deleteMessageRouter = Router();

deleteMessageRouter.get('/:id/delete', (req, res) => {
	if (!req.isAuthenticated() || !req.user.is_admin)
		res.redirect('/');
	const { id } = req.params;
	res.redirect(`/messages/${id}/confirm-delete`);
})

deleteMessageRouter.get('/:id/confirm-delete', async (req, res)=>{
	if (!req.isAuthenticated() || !req.user.is_admin)
		res.redirect('/');
	const { id } = req.params;
	const msg = await getPostById(id);
	if (!msg)
		res.redirect('/');
	res.render('delete_message', { message: msg });
})

deleteMessageRouter.post('/:id/confirm-delete', async (req, res)=>{
	if (!req.isAuthenticated() || !req.user.is_admin)
		res.redirect('/');
	const { id } = req.params;
	const msg = await getPostById(id);
	await deletePostById(id);
	res.redirect('/');
})

export default deleteMessageRouter;