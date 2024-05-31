import nedb from 'nedb-promises';

export const database = new nedb({
    filename: './data/menu.db',
    autoload: true
});

// @desc Get all promotions
// @route /promotions
export const getMenu = async (req, res, next) => {
    try {
        const coffee = await database.find({});
        res.json(coffee);
    } catch (error) {
        next(error);
    }
};

export default database