import { Router } from "express";
import nedb from "nedb-promises"

const route = Router();
const database = new nedb({ filename: "./data/promotions.db", autoload: true });

route.get("/", async (req, res, next) => {
    try {
        const promotions = await database.find({});
        res.status(200).json(promotions)
    } catch (error) {
        next(error);
    }

});

export default route;