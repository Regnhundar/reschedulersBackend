import nedb from 'nedb-promises';
import cart from './cartController.js'
import usersdb from './authController.js'
import { freeUserShipping } from '../utility/promotionFunctions.js'
import { setDeliveryTime, calculateDeliveryTime } from '../utility/timeFunction.js';

//Skapar orders db
const database = new nedb({
    filename: './data/orders.db',
    autoload: true
});

// @desc POST Skapar en order av cart
// @route /order
export const createOrder = async (req, res, next) => {
    try {
        if (!cart.length > 0) {
            const error = {
                status: 400,
                message: 'Varukorgen är tom kan inte skapa en order'
            }
            throw (error)
        }

        //sätter username till gäst - kollar sedan om username är inloggad och sätter usename till användaren (sparar objektet i currentUser)
        let username = 'guest'
        let currentUser = {}
        if (global.currentUser) {
            username = global.currentUser.username
            currentUser = await usersdb.findOne({ username: username });
        }

        const order = [];
        let shipping = freeUserShipping(global.shipping);
        let totalsum = 0;

        //Loopar cart och flyttar varje item till order. Uppdaterar totalpris. 
        cart.forEach(item => {
            order.push(item);
            totalsum += item.price;
        })
        //Rensar cart
        cart.splice(0, cart.length);

        //Kallar på importerad funktion för att sätta beräknad leveranstid
        const approxTime = setDeliveryTime();

        //Sammanställning av order
        const newOrder = {
            username,
            order,
            totalsum: totalsum + shipping,
            approxTime,
            shipping: shipping
        };

        //Lägger in order i db + hämtar för att få _id
        await database.insert(newOrder);
        const createdOrder = await database.findOne({
            username,
            order,
            approxTime
        })

        //Om inte gäst - ordern läggs in i db för den inloggade användaren
        if (username !== "guest") {
            global.currentUser.orders.unshift(createdOrder)
            currentUser.orders.unshift(createdOrder)
            usersdb.update({ id: currentUser.id }, { $set: { orders: currentUser.orders } })
        }
        res.status(200).send({
            success: true,
            status: 200,
            message: 'Ny order skapad',
            createdOrder
        })
    } catch (error) {
        next(error)
    }

}

// @desc POST Hämta inloggad users beställningar 
// @route /orders/user
export const getUserOrders = async (req, res, next) => {
    try {
        let user = global.currentUser;
        let totalSum = 0;

        if (!user) {
            const error = new Error("Du måste logga in för att se din historik")
            error.status = 401
            return next(error);
        }
        //Plockar fram orders från aktuell användare
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

// @desc GET Hämta leveranstid för inloggad användare.
// @route /orders/status
export const getOrderStatus = (req, res, next) => {
    if (!global.currentUser) {
        const error = new Error("Ingen användare är inloggad")
        error.status = 401
        return next(error);
    }

    //Kollar om currentUser har någon aktiv order
    const undeliveredOrder = global.currentUser.orders[0]
    if (!undeliveredOrder) {
        const error = new Error("Ingen aktiv beställning hittades")
        error.status = 404
        return next(error);
    }

    //Vid aktiv order - beräknar tid för leverans
    const approxDeliveryTime = parseInt(undeliveredOrder.approxTime);

    return res.status(200).json({
        message: calculateDeliveryTime(approxDeliveryTime),
        order: undeliveredOrder
    })
}

export default database