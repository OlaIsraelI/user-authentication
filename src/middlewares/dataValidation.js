const { body, validationResult } = require("express-validator");

// User registration validation and sanitization rules
const registerValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    .trim()
    .escape(),
];

// Middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { registerValidation, validate };
