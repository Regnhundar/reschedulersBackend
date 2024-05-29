import express from "express";

import errorHandler from "./middleware/errorHandler.js";

import cartRoute from './routes/cart.js'
import menuRouter from "./routes/menu.js";
import authenticationRoute from "./routes/auth.js"

const app = express();
const port = 1337;

//Middleware
app.use(express.json());
app.use('/auth', authenticationRoute);
// Routes 
app.use('/menu', menuRouter);
app.use('/cart', cartRoute)

app.listen(port, () => console.log(`Server running on ${port}`));
app.use(errorHandler);