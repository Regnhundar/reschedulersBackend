import nedb from 'nedb-promises';

import { cart } from '../routes/cart.js'
import { database as usersdb } from '../routes/auth.js'
const database = new nedb({
    filename: './data/orders.db',
    autoload: true
});

// @desc POST Create order from cart
// @route /order
export const createOrder = async (req, res, next) => {

    if (!cart.length > 0) {
        const error = {
            status: 400,
            message: 'Varukorgen är tom kan inte skapa en order'
        }
        return next(error)
    }

    let user = 'guest'
    let userdb = {}
    if (global.currentUser) {
        user = global.currentUser.username
        userdb = await usersdb.findOne({ username: global.currentUser.username });
    }

    const order = [];
    let totalsum = 0;

    cart.forEach(item => {
        order.push(item);
        totalsum += item.price;
    })

    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();

    minutes += Math.floor(Math.random() * (20 - 10 + 1) + 10)
    if (minutes >= 60) {
        minutes -= 60
        hour += 1
    }
    if (hour > 24) {
        hour -= 24
    }
    let approxTime = `${hour}${minutes}`

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
        userdb.orders.unshift(createdOrder)
        usersdb.update({ _id: userdb._id }, { $set: { orders: userdb.orders } })
    }

    res.status(200).send({
        success: true,
        status: 200,
        message: 'Ny order skapad',
        createdOrder
    })
}

export default database