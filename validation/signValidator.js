import { body } from "express-validator";

const validatorSign = [
	body("firstName")
	.trim()
	.notEmpty()
	.withMessage("First name is required")
	.isLength({ min: 2, max: 100 })
	.withMessage("First name must be between 2 and 100 characters"),

	body("lastName")
	.trim()
	.notEmpty()
	.withMessage("Last name is required")
	.isLength({ min: 2, max: 100 })
	.withMessage("Last name must be between 2 and 100 characters"),

	body("username")
	.trim()
	.notEmpty()
	.withMessage("Username is required")
	.isLength({ min: 3, max: 100 })
	.withMessage("Username must be between 3 and 100 characters"),

	body("password")
	.trim()
	.notEmpty()
	.withMessage("Password is required")
	.isLength({ min: 6, max: 100 })
	.withMessage("Password must be between 6 and 100 characters"),
]

export default validatorSign;