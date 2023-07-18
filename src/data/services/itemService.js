import * as api from "../api"

const endpoints = {
    item: '/item',
    cat: '/category'
}

export async function createItem(itemData) {
    return api.post(endpoints.item, itemData)
}

export async function getItems({ categoryId, search = '', limit = 10, skip = 0 }) {
    const queryParams = []
    if (categoryId) {
        queryParams.push(`where=${encodeURIComponent(`category="${categoryId}"`)}`)
    }
    if (search) {
        queryParams.push(`search=${search}`)
    }
    return api.get(endpoints.item + `?${queryParams.join('&')}&limit=${limit}&skip=${skip}`)
}

export async function getItemById(itemId) {
    return api.get(`${endpoints.item}/${itemId}`)
}

export async function createCategory(catData) {
    return api.post(endpoints.cat, catData, true)
}

export async function getAllChildCategories() {
    return api.get(endpoints.cat + `?where=${encodeURIComponent('childrenCount="0"')}`)
}

export async function getTopChildCategories(limit) {
    return api.get(endpoints.cat + `?orderBy=items&asc=-1&limit=${limit}&skip=0`)
}

export async function addUserRatingForItemId(itemId, rating) {
    return api.post(`${endpoints.item}/rating`, { item: itemId, rating }, true)
}

export async function getUserRatingForItemId(itemId, userId) {
    return api.get(`${endpoints.item}/rating?where=${encodeURIComponent(`item="${itemId}"&_creator="${userId}"`)}`)
}