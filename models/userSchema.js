import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(5).required(),
    password: Joi.string().alphanum().min(5).required(),
    email: Joi.string().email().required()
});

export default userSchema;