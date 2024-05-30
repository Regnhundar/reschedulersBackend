import express from "express";
import aboutRouter from './routes/about.js';
import errorHandler from "./middleware/errorHandler.js";
import cartRoute from './routes/cart.js'
import { router as menuRouter } from "./routes/menu.js";
import authenticationRoute from "./routes/auth.js"
import promotionsRoute from "./routes/promotions.js"

const app = express();
const port = 1337;

global.currentUser = null;
//Middleware
app.use(express.json());

// Routes 
app.use('/menu', menuRouter);
app.use('/cart', cartRoute)
app.use('/auth', authenticationRoute);
app.use('/about', aboutRouter);
app.use('/promotions', promotionsRoute);


app.listen(port, () => console.log(`Server running on ${port}`));
app.use(errorHandler);