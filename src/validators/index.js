import { body } from 'express-validator'

const userRegisterValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email format'),

        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
            .isLowercase().withMessage('Username must be in lowercase'),

        body('password')
            .trim()
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body("fullname")
            .optional()
            .trim()
    ]
}

const userLoginValidator = () => {
    return [
        body('email')
            .optional()
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email format'),

        body('password')
            .trim()
            .notEmpty().withMessage('Password is required')
    ]
}

export { userRegisterValidator, userLoginValidator }