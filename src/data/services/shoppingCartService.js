import * as api from "../api";

const endpoints = {
    cart: '/cart'
}

export async function getCartBydId(cartId) {
    return api.get(`${endpoints.cart}/${cartId}`)
}

export async function addToCartBydId(cartId, itemObj) {
    return api.post(`${endpoints.cart}/${cartId}`, itemObj, true)
}