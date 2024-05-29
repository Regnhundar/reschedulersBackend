import express from "express";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = 1337;

//Middleware
app.use(express.json());


app.listen(port, () => console.log(`Server running on ${port}`));
app.use(errorHandler);