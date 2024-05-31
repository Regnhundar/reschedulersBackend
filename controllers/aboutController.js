import nedb from 'nedb-promises';

// Skapa en databas för about 
const db = new nedb({ filename: './data/about.db', autoload: true });

// Insert text om databasen är tom:
db.count({})
    .then(count => {
        if (count === 0) {
            console.log('insert about text in database');
            db.insert({ text: 'Pumpkin spice mug, barista cup, sit macchiato, kopi-luwak, doppio, grounds dripper, crema, strong whipped, variety extra iced id lungo half and half mazagran. Pumpkin spice.' });
        }
    })
    .catch(err => {
        console.error('Error initializing database:', err);
    });

// @desc Get About 
// @route /about
export const getAbout = async (req, res, next) => {
    try {
        //Hämtar dokument i databasen
        const docs = await db.find({});
        // Om hämtningen lyckas, returnera dokumenten som JSON-svar.
        res.json(docs);
        //Om något går fel catchas detta och skickar error
    } catch (error) {
        next(error);
    }
};

export default db 