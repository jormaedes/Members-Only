import { Router } from "express";
import validatorSign from "../validation/signValidator.js";
import bcrypt from "bcryptjs";
import { createUser } from "../db/queries.js";
import { validationResult } from "express-validator";

const signRouter = Router();

signRouter.get('/', (req, res)=>{
	if (req.isAuthenticated())
		return res.redirect('/');
	res.render('sign-up');
})

signRouter.post('/', validatorSign, async (req, res) => {
	const { firstName, lastName, username, password, confirmPassword } = req.body;
	if (password !== confirmPassword)
		return res.status(400).render('error', {status: 400, message: 'Password is not equal'});
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).render('error', { status: 400, message: 'Validation failed.', errors: errors.array() });
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	await createUser(firstName, lastName, username, hashedPassword);
	res.redirect('/login');
})

export default signRouter;