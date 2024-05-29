import { Router } from "express";

const router = Router()

const cart = []

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

router.post('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const foundItem = menu.find(item => item.id === id)

    if (!foundItem) {
        const error = {
            status: 200,
            message: 'Kan inte lägga in produkten i varukorg'
        }
        return next(error)
    }

    cart.push(foundItem)

    res.status(200).send({
        message: 'Produkt tillagd i varukorgen',
        status: 200,
        data: cart
    })
})

export default router