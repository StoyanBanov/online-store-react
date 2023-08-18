import * as api from "../api"
import { createQueryParamsString } from "../util"

const endpoints = {
    item: '/item',
    cat: '/category'
}

//item

export async function createItem(itemData) {
    return api.post(endpoints.item, itemData)
}

export async function getItems({ catId, search, itemsPerPage = 1, page = 1, count, sortBy = 'rating', order = 'desc', minPrice, maxPrice, ...ranges }) {
    return api.get(endpoints.item + createQueryParamsString({ catId, search, itemsPerPage, page, count, sortBy, order, minPrice, maxPrice }))
}

export async function getItemById(itemId) {
    return api.get(`${endpoints.item}/${itemId}`)
}

export async function editItemById(itemId, itemData) {
    return api.put(`${endpoints.item}/${itemId}`, itemData)
}

export async function deleteItemById(itemId) {
    return api.del(`${endpoints.item}/${itemId}`)
}

export async function getFilterRanges({ catId, search, minPrice, maxPrice, ...ranges }) {
    const itemsListPrice = await api.get(endpoints.item + createQueryParamsString({ catId, search }))

    const filterRanges = {
        minPrice: itemsListPrice[0].price,
        maxPrice: itemsListPrice[0].price
    }

    for (const item of itemsListPrice) {
        if (item.price < filterRanges.minPrice)
            filterRanges.minPrice = item.price
        if (item.price > filterRanges.maxPrice)
            filterRanges.maxPrice = item.price
    }

    return filterRanges
}

//cat

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
    return api.get(endpoints.cat + `?where=${encodeURIComponent('childCategories=[]')}&orderBy=items&asc=-1&limit=${1}&skip=0`)
}

export async function editCategoryById(id, catData) {
    return api.put(endpoints.cat + '/' + id, catData)
}

//rating

export async function addUserRatingForItemId(itemId, rating) {
    return api.post(`${endpoints.item}/rating`, { item: itemId, rating }, true)
}

export async function getUserRatingForItemId(itemId, userId) {
    return api.get(`${endpoints.item}/rating?where=${encodeURIComponent(`item="${itemId}"&_creator="${userId}"`)}`)
}

//reviews

export async function getItemReviewsById(itemId) {
    return api.get(`${endpoints.item}/review?where${encodeURIComponent(`item="${itemId}"`)}`)
}

export async function addItemReviewById(itemId, text) {
    return api.post(`${endpoints.item}/review`, { item: itemId, text }, true)
}