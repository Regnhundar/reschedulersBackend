
// Tar emot ett errorobjekt och svarar med antingen det medskickade error.status eller 500. Svarar också med det meddelande vi skickar med.
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        status: err.status
    });
}

export default errorHandler;