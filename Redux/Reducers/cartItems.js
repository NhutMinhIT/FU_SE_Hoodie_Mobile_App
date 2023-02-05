import {
    ADD_TO_CART,
    REMOVE_TO_CART,
    CLEAR_CART
} from '../constants'

const cartItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload];

        case REMOVE_TO_CART:
            return state.filter(cartItems => cartItems !== action.payload);

        case CLEAR_CART:
            return state = []
    }
    return state
}

export default cartItems;