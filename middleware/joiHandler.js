// Tar emot ett schema och validerar mot vad som skickats med i req.body. Om det fastnar i valideringen skickas ett errorobjekt till errorHandler.
const joiHandler = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const errorResponse = new Error();
            errorResponse.status = 400;
            errorResponse.message = error.details[0].message;
            next(errorResponse);
        }
        next();
    }

}


export default joiHandler;