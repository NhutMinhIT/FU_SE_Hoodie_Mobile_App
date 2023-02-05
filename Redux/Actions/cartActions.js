import {
    ADD_TO_CART,
    REMOVE_TO_CART,
    CLEAR_CART
} from '../constants'

export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export const removeToCart = (payload) => {
    return {
        type: REMOVE_TO_CART,
        payload
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART,

    }
}