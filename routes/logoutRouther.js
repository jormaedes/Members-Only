import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get('/', (req, res, next) => {
	try {
		if (!req.isAuthenticated())
			return res.redirect('/');
		req.logout((err) => {
			if (err) return next(err);
		});
		res.redirect('/');
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to logout.', details: err.message });
	}
})

export default logoutRouter;