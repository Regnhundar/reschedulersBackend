import express from "express";

const app = express();
const port = 1337;

//Middleware
app.use(express.json());


app.listen(port, () => console.log(`Server running on ${port}`));