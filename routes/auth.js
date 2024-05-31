import { Router } from "express";
import userSchema from "../models/userSchema.js";
import nedb from "nedb-promises";
import joiHandler from "../middleware/joiHandler.js";

export const database = new nedb({ filename: "./data/users.db", autoload: true });

const router = Router();

router.post("/register", joiHandler(userSchema), async (req, res, next) => {

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
    const undeliveredOrder = global.currentUser.orders[0]
    console.log(undeliveredOrder);
    if (!undeliveredOrder) {
        return res.status(404).json({ message: 'Ingen aktiv beställning hittades' })
    }

    //Beräknar tid för leverans
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    const currentTime = parseInt(`${hour}${minutes}`)
    const approxDeliveryTime = parseInt(undeliveredOrder.approxTime);
    console.log('currentTime', currentTime);
    console.log('approxDeliveryTime', approxDeliveryTime);
    // const timeRemaining = approxDeliveryTime - currentTime;
    // console.log('timeRemaining', timeRemaining);
    currentTime > approxDeliveryTime ? console.log(true) : console.log(false);

    if (currentTime < approxDeliveryTime) {
        return res.status(200).json({
            message: `Ordern är på väg. Beräknad leveranstid är ${approxDeliveryTime}.`,
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

//getUserOrders
router.post("/user/orders", async (req, res, next) => {
    let user = global.currentUser;
    let totalSum = 0;

    if (!user) {
        return next({ message: "Du måste logga in för att se din historik", status: 401 });
    }

    const orders = user.orders;
    orders.forEach(order => totalSum += order.totalsum);

    res.status(200).send({
        success: true,
        status: 200,
        orders: orders,
        totalsumman: totalSum,
    });
})

export default router;