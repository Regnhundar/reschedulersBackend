import { Router } from 'express';
import nedb from 'nedb-promises';

export const router = Router();

export const database = new nedb({
    filename: './data/menu.db',
    autoload: true
});

router.get('/', async (req, res) => {
    try {
        const coffee = await database.find({});
        res.json(coffee);
    } catch (error) {
        res.status(500).json({ message: "Fel vid hämtning av meny" });
    }
});


