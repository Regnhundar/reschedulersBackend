import Joi from "joi";

const joiHandler = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const errorResponse = new Error('Valideringsfel!');
            errorResponse.status = 400;
            errorResponse.message = error.details[0].message;
            next(errorResponse);
        }
        next();
    }

}


export default joiHandler;