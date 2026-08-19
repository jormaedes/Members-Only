import { Router } from "express";
import { validationResult } from "express-validator";
import passport from "passport";

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
	if(req.isAuthenticated())
		return res.redirect('/');
	res.render('login');
})

loginRouter.post('/', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
}))

export default loginRouter;