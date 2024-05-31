import nedb from 'nedb-promises';

export const database = new nedb({
    filename: './data/menu.db',
    autoload: true
});

// @desc Get all promotions
// @route /promotions
export const getMenu = async (req, res) => {
    try {
        const coffee = await database.find({});
        res.json(coffee);
    } catch (error) {
        res.status(500).json({ message: "Fel vid hämtning av meny" });
    }
};

export default database