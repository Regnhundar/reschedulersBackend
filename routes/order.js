import { Router } from 'express';
import nedb from 'nedb-promises';
import orderSchema from '../models/orderSchema.js';

const router = Router();

const database = new nedb({
    filename: './data/orders.db',
    autoload: true
});

router.post('/', async (req, res, next) => {
    const { error } = orderSchema.validate(req.body);

    if (error) {
        const response = {
            success: false,
            message: error.details[0].message,
            status: 400
        };
        return next(response);
    }

    const { cart } = req.body;
    const order = [];
    let totalsum = 0;

    cart.map(item => {
        order.push(item);
        totalsum += item.price;
    })

    const newOrder = {
        user: 'guest',
        order,
        totalsum: totalsum,
        approxTime: 1533,
        isDelivered: false,
    };

    await database.insert(newOrder);

    res.status(200).send({
        success: true,
        status: 200,
        message: 'Ny order skapad',
        newOrder
    })
});

export default router;