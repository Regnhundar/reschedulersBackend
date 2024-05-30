import { Router } from "express";
import userSchema from "../models/userSchema.js";
import nedb from "nedb-promises";

export const database = new nedb({ filename: "./data/users.db", autoload: true });

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

//Se leveranstid på beställning - kollar först om användare är inloggad
router.get("/order", (req, res) => {
    if (!global.currentUser) {
        return res.status(401).json({ message: 'Ingen användare är inloggad' })
    }

    //Kollar om currentUser har någon aktiv order
    const undeliveredOrder = global.currentUser.orders.find(order => !order.isdelivered);
    if (!undeliveredOrder) {
        return res.status(404).json({ message: 'Ingen aktiv beställning hittades' })
    }

    //Beräknar tid för leverans
    const currentTime = new Date().getTime();
    const approxDeliveryTime = undeliveredOrder.approxTime;
    const timeRemaining = approxDeliveryTime - currentTime;

    if (timeRemaining > 0) {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        return res.status(200).json({
            message: `Ordern är på väg. Beräknad leverans om ${hours} timmar och ${minutes} minuter.`,
            order: undeliveredOrder
        });
    } else {
        return res.status(200).json({
            message: 'Ordern har levererats.',
            order: undeliveredOrder
        });
    }
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
});

export default router;