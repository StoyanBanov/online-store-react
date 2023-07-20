import * as api from "../api";

const endpoints = {
    cart: '/cart'
}

export async function getCartBydId(cartId) {
    return api.get(`${endpoints.cart}/${cartId}`)
}

export async function addToCartBydId(cartId, { item, count }) {
    return api.post(`${endpoints.cart}/${cartId}`, { item, count }, true)
}

export async function removeFromCartBydId(cartId, itemId) {
    return api.del(`${endpoints.cart}/${cartId}/${itemId}`)
}

export async function emptyCartBydId(cartId) {
    return api.del(`${endpoints.cart}/${cartId}`)
}