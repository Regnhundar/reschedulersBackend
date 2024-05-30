import { Router } from "express";
import { database as menu } from "./menu.js"

const router = Router()
const cart = []


router.get('/', (req, res, next) => {
    if (!cart.length > 0) {
        const error = {
            status: 404,
            message: 'Varukorgen är tom'
        }
        return next(error)
    }

    let totalPrice = 0
    let shipping = 50;

    cart.map(item => totalPrice += item.price);

    // Promotion inloggade får gratis frakt.
    if (global.currentUser) {
        shipping = 0
    }

    res.status(200).send({
        success: true,
        status: 200,
        data: {
            cart,
            shipping: shipping,
            total: totalPrice + shipping
        }
    })
});

// addToCart
router.post('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const foundItem = await menu.findOne(item => item.id === id)

    if (!foundItem) {
        const error = {
            status: 400,
            message: 'Kan inte lägga in produkten i varukorg'
        }
        return next(error)
    }

    // Promotion 3 för 2
    if (cart.length === 2) {
        const freebie = { ...foundItem, price: 0 }
        cart.push(freebie);
    } else {
        cart.push(foundItem);
    }


    res.status(200).send({
        success: true,
        status: 200,
        message: 'Produkt tillagd i varukorgen',
        data: { cart }
    })
})

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const foundItem = cart.find(item => item.id === id)
    //Om produkten inte finns i varukorgen skickas ett felmeddelande
    if (!foundItem) {
        const error = {
            status: 404,
            message: 'Produkten finns inte i varukorgen'
        }
        return next(error)
    }
    //Om produkten finns i varukorgen letar vi upp dess index och tar bort den
    cart.splice(cart.indexOf(foundItem), 1)
    res.status(200).send({
        success: true,
        status: 200,
        message: 'Produkt borttagen från varukorgen',
        data: { cart }
    })
})

export default router