import nedb from "nedb-promises"

const database = new nedb({ filename: "./data/promotions.db", autoload: true });

// @desc Get all promotions 
// @route /promotions
export const getPromotions = async (req, res, next) => {
    try {
        const promotions = await database.find({});
        res.status(200).json(promotions)
    } catch (error) {
        next(error);
    }
}

export default database