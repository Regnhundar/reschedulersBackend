
//Felmeddelande om sidan inte existerar (kallas i app innan specifika felmeddelanden)
const notFound = (req, res, next) => {
    const error = new Error(`Sidan kan inte hittas`);
    error.status = 404;

    next(error);
}

export default notFound;