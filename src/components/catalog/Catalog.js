import { useCallback, useEffect, useState } from "react"
import { getCategoryById, getAllRootCategories, getItems } from "../../data/services/itemService"

import { useParams, useSearchParams } from "react-router-dom"
import { ItemCard } from "./ItemCard"

import style from './style.module.css'
import { CategoryCard } from "./CategoryCard"
import { Pagination } from "./Pgination"

export const Catalog = () => {
    const [data, setData] = useState({ list: [], type: '', itemsPerPage: 1 })

    let [searchParams] = useSearchParams();
    const { catId } = useParams()

    useEffect(() => {
        if (catId) {
            getCategoryById(catId)
                .then(cat => {
                    if (cat.childCategories.length) {
                        setData({ list: cat.childCategories, type: 'categories' })
                    } else {
                        getItems({ search: searchParams.get('search'), catId: cat._id, skip: (searchParams.get('page') || 1) - 1 })
                            .then(items => setData(state => ({ ...state, list: items, type: 'items' })))
                        getItems({ count: true })
                            .then(c => setData(state => ({ ...state, count: c })))
                    }
                })
        } else if (searchParams.size) {
            getItems({ search: searchParams.get('search'), skip: (searchParams.get('page') || 1) - 1 })
                .then(items => setData({ list: items, type: 'items' }))
            getItems({ count: true })
                .then(c => setData(state => ({ ...state, count: c })))
        } else {
            getAllRootCategories()
                .then(cats => setData({ list: cats, type: 'categories' }))
        }
    }, [searchParams, catId])

    const setItemsPerPage = useCallback(e => {
        setData(state => ({ ...state, itemsPerPage: e.target.value }))
    }, [])

    return (
        <>
            <div className={style.catalogContainer}>
                {data.list.map(d => data.type === 'items' ? <ItemCard key={d._id} item={d} /> : <CategoryCard key={d._id} cat={d} />)}
            </div>
            {data?.type.includes('item') && data?.count > 0 &&
                <Pagination currentPage={Number(searchParams.get('page')) || 2 - 1} count={Math.ceil(data.count / data.itemsPerPage)} />
            }
        </>
    )
}