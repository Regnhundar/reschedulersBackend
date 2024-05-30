import Joi from 'joi';

const orderSchema = Joi.object({
    // user: Joi.string().required(),
    cart: Joi.array().required(),
});

export default orderSchema;