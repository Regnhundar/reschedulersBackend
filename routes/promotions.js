import { Router } from "express";
import nedb from "nedb-promises"

const route = Router();
const database = new nedb({ filename: "./data/promotions.db", autoload: true });

// database.insert({ promotion: "Fri frakt", information: "Just nu sparar våra registrerade kunder 50kr per köp genom fri frakt!" })

route.get("/", async (req, res, next) => {
    try {
        const promotions = await database.find({});
        res.status(200).json(promotions)
    } catch (error) {
        next(error);
    }

});

export default route;