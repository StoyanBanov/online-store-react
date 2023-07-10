import * as api from "../api"

const endpoints = {
    item: '/item',
    cat: '/category'
}

export async function createItem(itemData) {
    return api.post(endpoints.item, itemData)
}

export async function createCategory(catData) {
    return api.post(endpoints.cat, catData)
}