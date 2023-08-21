import * as api from "../api";

const endpoints = {
    user: '/user',
    address: '/user/address',
    purchase: '/user/purchase'
}

export async function getUserData() {
    return api.get(`${endpoints.user}`)
}

// address
export async function addUserAddress(data) {
    return api.post(`${endpoints.address}`, data, true)
}

export async function editUserAddress(id, data) {
    return api.put(`${endpoints.address}/${id}`, data, true)
}

// purchase
export async function addUserPurchase(data) {
    return api.post(`${endpoints.purchase}`, data, true)
}
