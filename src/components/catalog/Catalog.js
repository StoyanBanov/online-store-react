import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { getCategoryById, getAllRootCategories, getItems } from "../../data/services/itemService"

import { useParams } from "react-router-dom"
import { ItemCard } from "./ItemCard"

import { CategoryCard } from "./CategoryCard"
import { Pagination } from "./Pgination"
import { useQueryParams } from "../common/hooks/useQeryParams"
import { ItemOrderForm } from "./ItemOrderForm"

import style from './style.module.css'
import { ItemFilters } from "./itemFilters/ItemFilters"
import { MOBILE_MAX_WIDTH } from "../../constants"
import { DimensionsContext } from "../common/context/DimensionsContext"
import { usePop } from "../common/hooks/usePop"
import { PopBefore } from "../common/helpers/popBefore/PopBefore"

export const Catalog = () => {
    const [data, setData] = useState({ list: [], type: '' })

    const { searchParams, searchParamsObj } = useQueryParams()
    const { catId } = useParams()

    const { windowWidth } = useContext(DimensionsContext)

    const filtersRef = useRef()

    useEffect(() => {
        if (catId) {
            getCategoryById(catId)
                .then(cat => {
                    if (cat.childCategories.length) {
                        setData(state => ({ ...state, list: cat.childCategories, type: 'categories' }))
                    } else {
                        const queryOptions = {
                            ...searchParamsObj,
                            catId: cat._id,
                        }
                        Promise.all([getItems(queryOptions), getItems({ ...queryOptions, count: true, page: 1, itemsPerPage: null })])
                            .then(([items, itemsCount]) => {
                                setData({ list: items, type: 'items', count: itemsCount })
                            })
                    }
                })
        } else if (Array.from(searchParams).length > 0) { //searchParams.size() isnt't working with tests
            if (Object.keys(searchParamsObj).length > 0) {
                Promise.all([getItems(searchParamsObj), getItems({ ...searchParamsObj, count: true, page: 1, itemsPerPage: null })])
                    .then(([items, itemsCount]) => {
                        setData({ list: items, type: 'items', count: itemsCount })
                    })
            }
        } else {
            getAllRootCategories()
                .then(cats => setData({ list: cats, type: 'categories' }))
        }
    }, [catId, searchParams, searchParamsObj])

    const { displayPop: displayFilters, displayPopHandler } = usePop()

    const displayFiltersClickHandler = useCallback((isOpening) => {
        displayPopHandler(isOpening, filtersRef)
    }, [displayPopHandler, filtersRef])

    return (
        <section>
            {data.type === 'items'
                ? windowWidth > MOBILE_MAX_WIDTH
                    ? <ItemOrderForm />
                    : <>
                        <button onClick={displayFiltersClickHandler}>Filter/Order</button>
                        {displayFilters &&
                            <PopBefore popRef={filtersRef} displayPopClickHandler={displayFiltersClickHandler}>
                                <div>
                                    <ItemOrderForm />
                                    <ItemFilters />
                                </div>
                            </PopBefore>
                        }
                    </>
                : ''
            }
            <div className={style.catalogBottomContainer}>
                {(data.type === 'items' && windowWidth > MOBILE_MAX_WIDTH) &&
                    <ItemFilters />
                }

                <div>
                    <div className={style.catalogContainer}>
                        {data.list.map(d => data.type === 'items' ? <ItemCard key={d._id} item={d} /> : <CategoryCard key={d._id} cat={d} />)}
                    </div>

                    {data.count > 0 &&
                        <Pagination currentPage={Number(searchParamsObj?.page) || 2 - 1} count={Math.ceil(data.count / (Number(searchParamsObj?.itemsPerPage) || 1))} />
                    }
                </div>
            </div>

        </section>
    )
}