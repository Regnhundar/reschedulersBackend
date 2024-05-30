import { Router } from 'express';
import nedb from 'nedb-promises';

const router = Router();

const database = new nedb({
    filename: './data/orders.db',
    autoload: true
});

router.post('/', async (req, res, next) => {
    try {
        const response = await fetch('http://localhost:1337/cart/');

        if (response.status > 400) {
            throw {
                message: 'Något gick fel vid hämtning',
                status: response.status
            };
        }

        const cart = await response.json();

        // används inte eftersom vi skickar status 404 om varukorg är tom /*
        if (!cart.success) {
            const error = {
                status: 400,
                message: 'Varukorgen är tom kan inte skapa en order'
            }
            return next(error)
        }
        // */

        const user = 'guest'
        const order = [];
        let totalsum = 0;

        cart.data.cart.map(item => {
            order.push(item);
            totalsum += item.price;
        })

        const newOrder = {
            user,
            order,
            totalsum,
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
    } catch (error) {
        return next(error);
    }
});

export default router;