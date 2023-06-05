// const Joi = require("joi");
// const signupSchema = Joi.object({
// username: Joi.string().alphanum().min(3).max(30).required(),
// password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
// email: Joi.string().required().email({ minDomainSegments: 2 }),
// dob:Joi.string().required(),
// });

// const loginSchema = Joi.object({
// password: Joi.string().required(),
// email: Joi.string().email({ minDomainSegments: 2 }),
// });

// module.exports = {signupSchema, loginSchema};