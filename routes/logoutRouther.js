import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get('/', (req, res, next) => {
	if (!req.isAuthenticated())
		return res.redirect('/');
	req.logout((err) => {
		if (err) return next(err);
	});
	res.redirect('/');
})

export default logoutRouter;