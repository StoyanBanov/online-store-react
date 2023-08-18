export function createQueryParamsString({ catId, search, itemsPerPage, page, count, sortBy, order, minPrice, maxPrice }) {
    const queryParams = []

    if (sortBy) {
        queryParams.push(`sortBy=${encodeURIComponent(`${sortBy}="${order}"`)}`)
    }
    if (catId) {
        queryParams.push(`where=${encodeURIComponent(`category="${catId}"`)}`)
    }
    if (search) {
        queryParams.push(`search=${search}`)
    }
    if (count) {
        queryParams.push(`count=true`)
    }
    if (itemsPerPage) {
        queryParams.push(`limit=${itemsPerPage}&skip=${page - 1}`)
    }
    if (minPrice) {
        queryParams.push(`minPrice=${minPrice}`)
    }
    if (maxPrice) {
        queryParams.push(`maxPrice=${maxPrice}`)
    }

    return `?${queryParams.join('&')}`
}