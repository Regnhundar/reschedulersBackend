import nedb from 'nedb-promises';

//Skapar menu-db
export const database = new nedb({
    filename: './data/menu.db',
    autoload: true
});

// @desc GET Hämtar allt på menyn
// @route /menu
export const getMenu = async (req, res, next) => {
    try {
        const menu = await database.find({});
        res.status(200).json(menu);
    } catch (error) {
        next(error);
    }
};

export default database