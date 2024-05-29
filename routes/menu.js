import { Router } from 'express';
import nedb from 'nedb-promises';

const router = Router();

const database = new nedb({
    filename: './data/menu.db',
    autoload: true
}); 

const menu = [
    {
        "id":1,
        "title":"Bryggkaffe",
        "desc":"Bryggd på månadens bönor.",
        "price":39
    },
    {
        "id":2,
        "title":"Caffè Doppio",
        "desc":"Bryggd på månadens bönor.",
        "price":49
    },
    {
        "id":3,
        "title":"Cappuccino",
        "desc":"Bryggd på månadens bönor.",
        "price":49
    },
    {
        "id":4,
        "title":"Latte Macchiato",
        "desc":"Bryggd på månadens bönor.",
        "price":49
    },
    {
        "id":5,
        "title":"Kaffe Latte",
        "desc":"Bryggd på månadens bönor.",
        "price":54
    },
    {
        "id":6,
        "title":"Cortado",
        "desc":"Bryggd på månadens bönor.",
        "price":39
    }
];

//database.insert(menu); 

router.get('/', async (req, res) => {
    try {
    const coffee = await database.find({});
    res.json(coffee);
    } catch (error) {
        res.status(500).json({message: "Fel vid hämtning av meny"});
    }
});

export default router;
