export function createQueryParamsString({ catId, search, itemsPerPage, page, count, sortBy, order, minPrice, maxPrice, ranges }) {
    const queryParams = []
    const queryParamsWhere = []

    if (search) {
        queryParams.push(`search=${search}`)
    }

    if (sortBy) {
        queryParams.push(`sortBy=${encodeURIComponent(`${sortBy}="${order}"`)}`)
    }

    if (catId) {
        queryParamsWhere.push(encodeURIComponent(`category="${catId}"`))
    }

    if (ranges) {
        Object.entries(ranges).forEach(([k, v]) => {
            if (v) {
                if (v.includes(','))
                    queryParamsWhere.push(encodeURIComponent(`${k}=[${v.split(',').map(a => `"${a}"`).join(',')}]`))
                else
                    queryParamsWhere.push(encodeURIComponent(`${k}="${v}"`))
            }
        })
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

    return `?${queryParamsWhere.length ? `where=${queryParamsWhere.join(encodeURIComponent('&'))}&` : ''}${queryParams.join('&')}`
}