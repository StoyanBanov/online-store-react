import * as api from "../api"
import { createQueryParamsString } from "../util"

const endpoints = {
    item: '/item',
    cat: '/category'
}

// item

export async function createItem(itemData) {
    return api.post(endpoints.item, itemData)
}

export async function getItems({ catId, search, itemsPerPage = 1, page = 1, count, sortBy = 'rating', order = 'desc', minPrice, maxPrice, category, ...ranges }) {
    if (search) {
        return api.get(endpoints.item + createQueryParamsString({ search, itemsPerPage, page, count, sortBy, order, ranges: { category } }))
    }
    return api.get(endpoints.item + createQueryParamsString({ catId, itemsPerPage, page, count, sortBy, order, minPrice, maxPrice, ranges }))
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

// filters

export async function getFilterRanges({ catId, search, itemsPerPage, page, count, sortBy, order, minPrice, maxPrice, category, ...ranges }) {
    if (search) {
        const items = await api.get(endpoints.item + createQueryParamsString({ search }))

        return { category: new Set(items.map(i => i.category._id)) }
    } else {
        const itemsListPrice = await api.get(endpoints.item + createQueryParamsString({ catId, ranges }))

        const filterRanges = {
            minPrice: itemsListPrice[0]?.price ?? 0,
            maxPrice: itemsListPrice[0]?.price ?? 0
        }

        for (const item of itemsListPrice) {
            if (item.price < filterRanges.minPrice)
                filterRanges.minPrice = item.price
            if (item.price > filterRanges.maxPrice)
                filterRanges.maxPrice = item.price
        }

        const categoryFields = Object.keys((await getCategoryById(catId)).itemFields ?? {})

        for (const field of categoryFields) {
            const rangesField = Object.fromEntries(Object.entries(ranges).filter(r => r[0] !== field))
            const itemsListField = await api.get(endpoints.item + createQueryParamsString({ catId, minPrice, maxPrice, ranges: rangesField }))

            filterRanges[field] = new Set()

            for (const item of itemsListField) {
                filterRanges[field].add(item[field])
            }
        }

        return filterRanges
    }

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
    return api.get(endpoints.cat + `?where=${encodeURIComponent('childCategories=[]')}&orderBy=items&asc=-1&limit=${limit}&skip=0`)
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

export async function getItemReviewsById({ item, page = 1, itemsPerPage, count }) {
    return api.get(`${endpoints.item}/review` + createQueryParamsString({ itemsPerPage, page, count, ranges: { item } }))
}

export async function addItemReviewById(itemId, text) {
    return api.post(`${endpoints.item}/review`, { item: itemId, text }, true)
}

export async function addLikeByReviewId(reviewId) {
    return api.post(`${endpoints.item}/review/likes`, { reviewId }, true)
}

export async function removeLikeByReviewId(reviewId) {
    return api.del(`${endpoints.item}/review/likes`, { reviewId }, true)
}