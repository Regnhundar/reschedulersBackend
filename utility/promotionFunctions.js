import promotionsDB from "../controllers/promotionController.js";


// const activePromotions = await promotionsDB.find({ active: true });



export const threeForThePrice = async (cart, menu) => {

    // Promotion 3 för 2
    try {
        if (cart.length > 2) {
            cart.splice(2, 1, { ...cart[2], price: 0 });
        } else {
            let freebie = cart.findIndex(item => item.price === 0);
            if (freebie !== -1) {
                const originalPrice = await menu.findOne({ title: cart[freebie].title })
                cart[freebie].price = originalPrice.price;
            }
        }
        return cart
    } catch (error) {
        console.log(error);
    }

}

export const shippingCost = () => {
    let shipping = 50;
    if (global.currentUser) {
        shipping = 0
    }
    return shipping
}

// export const handlePromotions = async (cart, menu) => {

//     activePromotions.forEach(p => {
//         if (p.active) {
//             switch (p.id) {
//                 case 'threeForThePrice':
//                     threeForThePrice(cart, menu);
//                     break;
//                 case 'shippingCost':
//                     shippingCost();
//                     break;
//             }
//         }
//     });
// }
// handlePromotions();