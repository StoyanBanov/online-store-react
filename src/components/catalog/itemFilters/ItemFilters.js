import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { ItemPriceFilter } from './ItemPriceFilter'

import style from './style.module.css'
import { useQueryParams } from '../../common/hooks/useQeryParams'
import { getFilterRanges } from '../../../data/services/itemService'

export const ItemFilters = () => {
    const [filterRanges, setFilterRanges] = useState({
        minPrice: 0,
        maxPrice: 0
    })

    const { catId } = useParams()

    const { searchParamsObj, setSearchParams } = useQueryParams()

    useEffect(() => {
        if (!catId && searchParamsObj.search) {
            getFilterRanges({ search: searchParamsObj.search })
                .then(data => {
                    setFilterRanges(data)
                })
        } else if (catId && searchParamsObj) {
            getFilterRanges({ catId, ...searchParamsObj })
                .then(data => {
                    for (const [k, v] of Object.entries(searchParamsObj)) {
                        if (data[k] && !k.includes('Price')) {
                            for (const a of v.split(',')) {
                                data[k].add(a)
                            }
                        }
                    }
                    setFilterRanges(data)
                })
        }
    }, [catId, searchParamsObj])

    const updateFilters = useCallback((...elements) => {
        const newFilters = { ...searchParamsObj }
        newFilters.page = 1
        for (const e of elements) {
            if (e.name.includes('Price') || !searchParamsObj[e.name])
                newFilters[e.name] = e.value
            else {
                if (searchParamsObj[e.name].includes(e.value)) {
                    newFilters[e.name] = searchParamsObj[e.name].split(',').filter(s => s !== e.value).join(',')
                    if (!newFilters[e.name]) {
                        delete newFilters[e.name]
                    }
                }
                else
                    newFilters[e.name] = searchParamsObj[e.name] + ',' + e.value
            }
        }

        setSearchParams(newFilters)
    }, [setSearchParams, searchParamsObj])

    return (
        <div className={style.itemFilters}>
            {
                Object.entries(filterRanges).filter(r => !r[0].includes('Price')).map(([k, v]) =>
                    <div key={k}>
                        <span>{k}</span>
                        <ul>
                            {
                                [...v].sort().map(a =>
                                    <li onClick={() => updateFilters({ name: k, value: a })} key={a}>
                                        {a}
                                        {searchParamsObj[k]?.includes(a) &&
                                            <svg width={20} height={20} stroke='black' strokeWidth={1}>
                                                <line x1={2} y1={2} x2={18} y2={18} />
                                                <line x1={2} y1={18} x2={18} y2={2} />
                                            </svg>
                                        }
                                    </li>)
                            }
                        </ul>
                    </div>
                )
            }
            {(filterRanges.minPrice || filterRanges.maxPrice) &&
                <>
                    <span>Price</span>
                    <ItemPriceFilter minPrice={Math.floor(filterRanges.minPrice)} maxPrice={Math.ceil(filterRanges.maxPrice)} updateFilters={updateFilters} />
                </>
            }
        </div>
    )
}