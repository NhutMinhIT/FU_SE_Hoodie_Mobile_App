import {
    ADD_TO_CART,
    REMOVE_TO_CART,
    CLEAR_CART
} from '../constants'

const cartItems = (state = [], action) => {
    switch (action.type) {
        //add to cart
        case ADD_TO_CART:
            return [...state, action.payload];
            //remove ro cart
        case REMOVE_TO_CART:
            return state.filter(cartItems => cartItems !== action.payload);
            //clear cart
        case CLEAR_CART:
            return state = []
    }
    return state
}

export default cartItems;