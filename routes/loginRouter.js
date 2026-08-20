import { Router } from "express";
import { validationResult } from "express-validator";
import passport from "passport";

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
	try {
		if (req.isAuthenticated())
			return res.redirect('/');
		const messages = req.session.messages || [];
		req.session.messages = [];
		res.render('login', { messages });
	} catch (err) {
		res.status(500).render('error', { status: 500, message: 'Failed to load user.', details: err.message });
	}
})

loginRouter.post('/', passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureMessage: true,
}))

export default loginRouter;