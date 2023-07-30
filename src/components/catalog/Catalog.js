import { useEffect, useState } from "react"
import { getCategoryById, getAllRootCategories, getItems } from "../../data/services/itemService"

import { useParams, useSearchParams } from "react-router-dom"
import { ItemCard } from "./ItemCard"

import style from './style.module.css'
import { CategoryCard } from "./CategoryCard"

export const Catalog = () => {
    const [data, setData] = useState({ list: [], type: '' })

    let [searchParams] = useSearchParams();
    const { catId } = useParams()

    useEffect(() => {
        if (catId) {
            getCategoryById(catId)
                .then(cat => {
                    if (cat.childCategories.length) {
                        setData({ list: cat.childCategories, type: 'categories' })
                    } else {
                        getItems({ search: searchParams.get('search'), catId: cat._id })
                            .then(items => setData({ list: items, type: 'items' }))
                    }
                })
        } else if (searchParams.size) {
            getItems({ search: searchParams.get('search') })
                .then(items => setData({ list: items, type: 'items' }))
        } else {
            getAllRootCategories()
                .then(cats => setData({ list: cats, type: 'categories' }))
        }
    }, [searchParams, catId])

    return (
        <div className={style.catalogContainer}>
            {data.list.map(d => data.type === 'items' ? <ItemCard key={d._id} item={d} /> : <CategoryCard key={d._id} cat={d} />)}
        </div>
    )
}