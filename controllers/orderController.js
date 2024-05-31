import nedb from 'nedb-promises';
import cart from './cartController.js'
import usersdb from './authController.js'
import { setDeliveryTime } from '../utility/timeFunction.js';

const database = new nedb({
    filename: './data/orders.db',
    autoload: true
});

// @desc POST Create order from cart
// @route /order
export const createOrder = async (req, res, next) => {
    try {
        if (!cart.length > 0) {
            const error = {
                status: 400,
                message: 'Varukorgen är tom kan inte skapa en order'
            }
            return next(error)
        }

        let user = 'guest'
        let currentUser = {}
        if (global.currentUser) {
            user = global.currentUser.username
            currentUser = await usersdb.findOne({ username: global.currentUser.username });
        }

        const order = [];
        let totalsum = 0;

        cart.forEach(item => {
            order.push(item);
            totalsum += item.price;
        })
        cart.splice(0, cart.length)

        const approxTime = setDeliveryTime()

        const newOrder = {
            user,
            order,
            totalsum,
            approxTime,
        };

        await database.insert(newOrder);
        const createdOrder = await database.findOne({
            user,
            order,
            totalsum,
            approxTime
        })

        if (user !== "guest") {
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

export default database