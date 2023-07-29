import * as api from "../api"

const endpoints = {
    item: '/item',
    cat: '/category'
}

export async function createItem(itemData) {
    return api.post(endpoints.item, itemData)
}

export async function getItems({ catId, search = '', limit = 10, skip = 0 }) {
    const queryParams = []
    if (catId) {
        queryParams.push(`where=${encodeURIComponent(`category="${catId}"`)}`)
    }
    if (search) {
        queryParams.push(`search=${search}`)
    }
    return api.get(endpoints.item + `?${queryParams.join('&')}&limit=${limit}&skip=${skip}`)
}

export async function getItemById(itemId) {
    return api.get(`${endpoints.item}/${itemId}`)
}

export async function editItemById(itemId, itemData) {
    return api.put(`${endpoints.item}/${itemId}`, itemData)
}

export async function createCategory(catData) {
    return api.post(endpoints.cat, catData)
}

export async function getAllRootCategories() {
    return api.get(endpoints.cat + `?where=${encodeURIComponent('parentCategory=null')}`)
}

export async function getAllParentCategories() {
    return api.get(endpoints.cat + `?where=${encodeURIComponent('items=[]')}`)
}

export async function getCategoryById(id) {
    return api.get(endpoints.cat + '/' + id)
}

export async function getAllChildCategories() {
    return api.get(endpoints.cat + `?where=${encodeURIComponent('childCategories=[]')}`)
}

export async function getTopChildCategories(limit) {
    return api.get(endpoints.cat + `?where=${encodeURIComponent('childCategories=[]')}&orderBy=items&asc=-1&limit=${limit}&skip=0`)
}

export async function editCategoryById(id, catData) {
    return api.put(endpoints.cat + '/' + id, catData)
}

export async function addUserRatingForItemId(itemId, rating) {
    return api.post(`${endpoints.item}/rating`, { item: itemId, rating }, true)
}

export async function getUserRatingForItemId(itemId, userId) {
    return api.get(`${endpoints.item}/rating?where=${encodeURIComponent(`item="${itemId}"&_creator="${userId}"`)}`)
}