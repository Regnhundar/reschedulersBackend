import { Router } from 'express';
import nedb from 'nedb-promises';

const router = Router();

// Skapa en databas för about 
const db = new nedb({ filename: './data/about.db', autoload: true });

// Example: Insert text om databasen är tom
// db.count({})
//     .then(count => {
//         if (count === 0) {
//             db.insert({ text: 'Pumpkin spice mug, barista cup, sit macchiato, kopi-luwak, doppio, grounds dripper, crema, strong whipped, variety extra iced id lungo half and half mazagran. Pumpkin spice.' });
//         }
//     })
//     .catch(err => {
//         console.error('Error initializing database:', err);
//     });

// GET about
router.get('/', async (req, res) => {
    try {
        //Hämtar dokument i databasen
        const docs = await db.find({});
        // Om hämtningen lyckas, returnera dokumenten som JSON-svar.
        res.json(docs);
    } catch (error) {
        //Om något går fel catchas detta ocg skickar error
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;