import express from "express";
import errorHandler from "./middleware/errorHandler.js";

import cartRoute from './routes/cart.js'

const app = express();
const port = 1337;

//Middleware
app.use(express.json());

app.use('/cart', cartRoute)


app.listen(port, () => console.log(`Server running on ${port}`));
app.use(errorHandler);