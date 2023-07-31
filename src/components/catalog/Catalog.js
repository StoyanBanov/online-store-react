import { useCallback, useEffect, useState } from "react"
import { getCategoryById, getAllRootCategories, getItems } from "../../data/services/itemService"

import { useParams, useSearchParams } from "react-router-dom"
import { ItemCard } from "./ItemCard"

import style from './style.module.css'
import { CategoryCard } from "./CategoryCard"
import { Pagination } from "./Pgination"

export const Catalog = () => {
    const [data, setData] = useState({ list: [], type: '' })

    const [searchParams, setSearchParams] = useSearchParams();
    const { catId } = useParams()

    const [filterValues, setFilterValues] = useState({
        itemsPerPage: 1,
        sortBy: 'price',
        order: 'asc',
        search: '',
    })

    useEffect(() => {
        if (searchParams.size) {
            setFilterValues(state => ({ ...state, ...Object.fromEntries(searchParams.entries()) }))
        }
    }, [searchParams])

    useEffect(() => {
        if (catId) {
            getCategoryById(catId)
                .then(cat => {
                    if (cat.childCategories.length) {
                        setData(state => ({ ...state, list: cat.childCategories, type: 'categories' }))
                    } else {
                        const queryOptions = {
                            search: searchParams.get('search'),
                            catId: cat._id,
                            skip: (searchParams.get('page') || 1) - 1,
                            limit: searchParams.get('itemsPerPage') || 1,
                            sortBy: searchParams.get('sortBy') ? { field: searchParams.get('sortBy'), order: searchParams.get('order') } : undefined
                        }
                        Promise.all([getItems(queryOptions), getItems({ ...queryOptions, count: true, skip: 0, limit: null })])
                            .then(([items, itemsCount]) => {
                                setData({ list: items, type: 'items', count: itemsCount })
                            })
                    }
                })
        } else if (searchParams.size) {
            const queryOptions = {
                search: searchParams.get('search'),
                skip: (searchParams.get('page') || 1) - 1,
                limit: searchParams.get('itemsPerPage') || 1,
                sortBy: searchParams.get('sortBy') ? { field: searchParams.get('sortBy'), order: searchParams.get('order') } : undefined
            }
            Promise.all([getItems(queryOptions), getItems({ ...queryOptions, count: true, skip: 0, limit: null })])
                .then(([items, itemsCount]) => {
                    setData({ list: items, type: 'items', count: itemsCount })
                })
        } else {
            getAllRootCategories()
                .then(cats => setData({ list: cats, type: 'categories' }))
        }
    }, [searchParams, catId])

    const filterChangeHandler = useCallback(e => {
        setFilterValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const filterSubmitHandler = useCallback(e => {
        e.preventDefault()
        setSearchParams(Object.assign(Object.fromEntries(searchParams.entries()), filterValues, { page: 1 }))
    }, [setSearchParams, searchParams, filterValues])

    return (
        <>
            <form onSubmit={filterSubmitHandler} className={style.filterForm}>
                <label htmlFor="sortFilter">Sort by</label>
                <select id="sortFilter" name="sortBy" onChange={filterChangeHandler}>
                    <option>price</option>
                    <option>title</option>
                    <option>rating</option>
                </select>

                <label htmlFor="sortOrder">Order</label>
                <select id="sortOrder" name="order" onChange={filterChangeHandler}>
                    <option>ascending</option>
                    <option>descending</option>
                </select>

                <label htmlFor="itemsPerPage">Items per page</label>
                <select id="itemsPerPage" name="itemsPerPage" onChange={filterChangeHandler}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>

                <button>Filter</button>
            </form>

            <div className={style.catalogContainer}>
                {data.list.map(d => data.type === 'items' ? <ItemCard key={d._id} item={d} /> : <CategoryCard key={d._id} cat={d} />)}
            </div>

            {data.count && filterValues.itemsPerPage &&
                <Pagination currentPage={Number(searchParams.get('page')) || 2 - 1} count={Math.ceil(data.count / (searchParams.get('itemsPerPage') || 1))} />
            }
        </>
    )
}