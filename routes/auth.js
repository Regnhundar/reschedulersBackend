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

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    const authUser = await database.findOne({ username: username, password: password });

    if (authUser) {

        global.currentUser = authUser;
        res.status(200).json({ message: `Välkommen tillbaka ${username}!` })
    } else {
        const error = new Error("Antingen användarnamn eller lösenord är fel")
        error.status = 400
        next(error);
    }
});

//Logout
router.post("/logout", (req, res) => {
    global.currentUser = null;
    res.status(200).json({ message: 'Lyckad utloggning' });
})

export default router;