import * as api from "../api"

const endpoints = {
    item: '/item',
    cat: '/category'
}

export async function createItem(itemData) {
    return api.post(endpoints.item, itemData)
}

export async function getItemsForCategory(categoryId, limit = 10, skip = 0) {
    return api.get(endpoints.item + `?where=${encodeURIComponent(`category="${categoryId}"`)}&limit=${limit}&skip=${skip}`)
}

export async function createCategory(catData) {
    return api.post(endpoints.cat, catData)
}

export async function getAllChildCategories() {
    return api.get(endpoints.cat + `?where=${encodeURIComponent('childrenCount="0"')}`)
}