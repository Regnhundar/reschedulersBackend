import express from "express";
import menuRouter from "./routes/menu.js";

const app = express();
const port = 1337;

//Middleware
app.use(express.json());

app.use('/menu', menuRouter);

app.listen(port, () => console.log(`Server running on ${port}`));