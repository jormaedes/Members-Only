import { body } from "express-validator";

const validatorLogin = [
	body("username")
	.trim()
	.notEmpty()
	.withMessage("Username is required"),

	body("password")
	.trim()
	.notEmpty()
	.withMessage("Password is required")
]

export default validatorLogin;