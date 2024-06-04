import menu from "../controllers/menuController.js";
import { runPromotions } from "../utility/promotionFunctions.js";

//Skapar cart
let cart = []

// @desc GET Hämta hem varukorgen och applicerar kampanjer.
// @route /cart
export const getCart = async (req, res, next) => {
    try {
        if (!cart.length > 0) {
            const error = {
                status: 200,
                message: 'Varukorgen är tom'
            }
            throw (error);
        }

        //Skapar totalPrice för cart
        let totalPrice = 0

        //Variabel för användning av promotions (Skickar in cart, shipping och menu till runPromotions som skickar tillbaka dem updated)
        const { cart: updatedCart, shipping: updatedShipping } = await runPromotions(cart, menu, global.shipping);

        cart.forEach(item => totalPrice += item.price);

        res.status(200).send({
            success: true,
            status: 200,
            data: {
                cart: updatedCart,
                shipping: updatedShipping,
                total: totalPrice + updatedShipping
            }
        });
    } catch (error) {
        next(error)
    }

};

// @desc POST Lägg till i varukorgen
// @route /cart
export const addToCart = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const foundItem = await menu.findOne({ id: id })

        if (!foundItem) {
            const error = {
                status: 400,
                message: 'Kan inte lägga in produkten i varukorg'
            }
            throw (error);
        }

        cart.push(foundItem);

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Produkt tillagd i varukorgen',
            data: { cart }
        })
    } catch (error) {
        next(error);
    }

}

// @desc DELETE Ta bort från varukorgen
// @route /cart/:id
export const removeFromCart = (req, res, next) => {
    const id = parseInt(req.params.id)
    const foundItem = cart.find(item => item.id === id)
    // Om produkten inte finns i varukorgen skickas ett felmeddelande
    if (!foundItem) {
        const error = {
            status: 404,
            message: 'Produkten finns inte i varukorgen'
        }
        return next(error)
    }
    // Om produkten finns i varukorgen letar vi upp dess index och tar bort den
    cart.splice(cart.indexOf(foundItem), 1)
    res.status(200).send({
        success: true,
        status: 200,
        message: 'Produkt borttagen från varukorgen',
        data: { cart }
    })
}

export default cart;