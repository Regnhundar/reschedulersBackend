import express from "express";
import aboutRoute from './routes/about.js';
import errorHandler from "./middleware/errorHandler.js";
import cartRoute from './routes/cart.js'
import menuRoute from "./routes/menu.js";
import authenticationRoute from "./routes/auth.js"
import promotionsRoute from "./routes/promotions.js"
import orderRoute from './routes/order.js';
import notFound from "./middleware/notFound.js";

const app = express();
const port = 1337;

global.currentUser = null;

//Middleware
app.use(express.json());

// Routes 
app.use('/menu', menuRoute);
app.use('/cart', cartRoute);
app.use('/auth', authenticationRoute);
app.use('/about', aboutRoute);
app.use('/promotions', promotionsRoute);
app.use('/order', orderRoute);

app.listen(port, () => console.log(`Server running on ${port}`));

// Middleware för felhantering:
app.use(notFound); // URL kan inte hittas
app.use(errorHandler); // Specifika error