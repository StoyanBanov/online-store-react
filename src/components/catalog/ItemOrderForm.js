import { useCallback, useEffect, useState } from 'react'
import style from './style.module.css'
import { useQueryParams } from '../common/hooks/useQeryParams'

export const ItemOrderForm = () => {

    const { searchParamsObj, setSearchParams } = useQueryParams()

    const [filterValues, setFilterValues] = useState({
        itemsPerPage: 1,
        sortBy: 'rating',
        order: 'desc',
        search: '',
    })

    useEffect(() => {
        if (searchParamsObj) {
            setFilterValues(state => ({ ...state, ...searchParamsObj }))
        }
    }, [searchParamsObj])

    const filterChangeHandler = useCallback(e => {
        setFilterValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const filterSubmitHandler = useCallback(e => {
        e.preventDefault()
        setSearchParams(Object.assign(filterValues, { page: 1 }))
    }, [setSearchParams, filterValues])

    return (
        <form onSubmit={filterSubmitHandler} className={style.filterForm}>
            <div>
                <label htmlFor="sortFilter">Sort by: </label>
                <select id="sortFilter" name="sortBy" onChange={filterChangeHandler} value={filterValues.sortBy}>
                    <option>price</option>
                    <option>rating</option>
                    <option>title</option>
                </select>
            </div>

            <div>
                <label htmlFor="sortOrder">Order: </label>
                <select id="sortOrder" name="order" onChange={filterChangeHandler} value={filterValues.order}>
                    <option>descending</option>
                    <option>ascending</option>
                </select>
            </div>

            <div>
                <label htmlFor="itemsPerPage">Items per page: </label>
                <select id="itemsPerPage" name="itemsPerPage" onChange={filterChangeHandler} value={filterValues.itemsPerPage}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>

            <button>Filter</button>
        </form>
    )
}