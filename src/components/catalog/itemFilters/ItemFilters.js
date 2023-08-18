import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { ItemPriceFilter } from './ItemPriceFilter'

import style from './style.module.css'
import { useQueryParams } from '../../common/hooks/useQeryParams'
import { getFilterRanges } from '../../../data/services/itemService'

export const ItemFilters = () => {
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 0
    })

    const [filterRanges, setFilterRanges] = useState({
        minPrice: 0,
        maxPrice: 0
    })

    const { catId } = useParams()

    const { searchParamsObj, setSearchParams } = useQueryParams()

    useEffect(() => {
        if (catId && searchParamsObj) {
            getFilterRanges({ catId, ...searchParamsObj })
                .then(data => {
                    setFilterRanges(data)
                    setFilters({ ...searchParamsObj, minPrice: data.minPrice, maxPrice: data.maxPrice })
                })
        }
    }, [catId, searchParamsObj])

    const updateFilters = useCallback((elements) => {
        const newFilters = {}
        for (const e of elements) {
            newFilters[e.name] = e.value
        }

        setSearchParams({ ...filters, ...newFilters })
    }, [setSearchParams, filters])

    return (
        <div className={style.itemFilters}>
            <span>Price</span>

            <ItemPriceFilter minPrice={Math.floor(filters.minPrice)} maxPrice={Math.ceil(filters.maxPrice)} updateFilters={updateFilters} />
        </div>
    )
}