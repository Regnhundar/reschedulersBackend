import express from "express";

import cartRoute from './routes/cart.js'

const app = express();
const port = 1337;

//Middleware
app.use(express.json());

app.use('/cart', cartRoute)


app.listen(port, () => console.log(`Server running on ${port}`));