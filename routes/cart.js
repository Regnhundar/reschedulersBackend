import { Router } from "express";

const router = Router()
const cart = []

// Tas bort när db är fixas  /*
const menu = [
    {
        "id": 1,
        "title": "Bryggkaffe",
        "desc": "Bryggd på månadens bönor.",
        "price": 39
    },
    {
        "id": 2,
        "title": "Caffè Doppio",
        "desc": "Bryggd på månadens bönor.",
        "price": 49
    },
    {
        "id": 3,
        "title": "Cappuccino",
        "desc": "Bryggd på månadens bönor.",
        "price": 49
    },
    {
        "id": 4,
        "title": "Latte Macchiato",
        "desc": "Bryggd på månadens bönor.",
        "price": 49
    },
    {
        "id": 5,
        "title": "Kaffe Latte",
        "desc": "Bryggd på månadens bönor.",
        "price": 54
    },
    {
        "id": 6,
        "title": "Cortado",
        "desc": "Bryggd på månadens bönor.",
        "price": 39
    }
]
// */

router.get('/', (req, res, next) => {
    if (!cart.length > 0) {
        const error = {
            status: 404,
            message: 'Varukorgen är tom'
        }
        return next(error)
    }

    let totalPrice = 0
    cart.map(item => totalPrice += item.price)

    res.status(200).send({
        success: true,
        status: 200,
        data: {
            cart,
            total: totalPrice
        }
    })
})

router.post('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const foundItem = menu.find(item => item.id === id)

    if (!foundItem) {
        const error = {
            status: 400,
            message: 'Kan inte lägga in produkten i varukorg'
        }
        return next(error)
    }
    cart.push(foundItem)
    res.status(200).send({
        success: true,
        status: 200,
        message: 'Produkt tillagd i varukorgen',
        data: { cart }
    })
})

export default router