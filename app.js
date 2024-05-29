import express from "express";
import aboutRouter from './routes/about.js';

const app = express();
const port = 1337;

//Middleware
app.use(express.json());

// Routes
app.use('/about', aboutRouter);

app.listen(port, () => console.log(`Server running on ${port}`));