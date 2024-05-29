import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import authenticationRoute from "./routes/auth.js"

const app = express();
const port = 1337;

//Middleware
app.use(express.json());
app.use('/auth', authenticationRoute);

app.listen(port, () => console.log(`Server running on ${port}`));
app.use(errorHandler);