import { v4 } from "uuid";
import nedb from "nedb-promises";
import { calculateDeliveryTime } from "../utility/timeFunction.js";

const database = new nedb({ filename: "./data/users.db", autoload: true });


// @desc POST logga in användare
// @route /auth/login
export const loginUser = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }

}

// @desc POST logga ut användaren.
// @route /auth/logout
export const logoutUser = (req, res) => {
    global.currentUser = null;
    res.status(200).json({ message: 'Lyckad utloggning' });
}

// @desc POST Registrera en ny användare.
// @route /auth/register
export const registerUser = async (req, res, next) => {
    try {
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
            id: v4().slice(0, 8),
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
    } catch (error) {
        next(error)
    }

}

// @desc GET Hämta leveranstid för inloggad användare.
// @route /order
export const getOrderStatus = (req, res) => {
    if (!global.currentUser) {
        return res.status(401).json({ message: 'Ingen användare är inloggad' })
    }

    //Kollar om currentUser har någon aktiv order
    const undeliveredOrder = global.currentUser.orders[0]
    if (!undeliveredOrder) {
        return res.status(404).json({ message: 'Ingen aktiv beställning hittades' })
    }

    //Beräknar tid för leverans
    const approxDeliveryTime = parseInt(undeliveredOrder.approxTime);

    return res.status(200).json({
        message: calculateDeliveryTime(approxDeliveryTime),
        order: undeliveredOrder
    })
}

// @desc POST Hämta inloggad users beställningar 
// @route /user/orders
export const getUserOrders = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error)
    }

}

export default database;