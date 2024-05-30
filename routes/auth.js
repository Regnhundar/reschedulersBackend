import { Router } from "express";
import userSchema from "../models/userSchema.js";
import nedb from "nedb-promises";

const database = new nedb({ filename: "./data/users.db", autoload: true });

const router = Router();

router.post("/register", async (req, res, next) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        const response = {
            success: false,
            message: error.details[0].message,
            status: 400
        }
        return next(response);
    }

    const { username, password, email } = req.body;
    const user = await database.findOne({ username: username });
    const userMail = await database.findOne({ email: email });

    if (user) {
        return next({
            message: `Användarnamn upptaget. Prova ${username}1`, status: 409
        });
    }
    if (userMail) {
        return next({
            message: `Din email har redan registrerats av en användare.`, status: 409
        });
    }

    const newUser = {
        username: username,
        password: password,
        email: email,
        orders: [],
        totalsum: 0
    }

    await database.insert(newUser);

    global.currentUser = newUser;

    const success = {
        success: true,
        message: `Välkommen till flocken ${username}!`,
        status: 201
    }

    return res.status(201).json(success);
});

export default router;