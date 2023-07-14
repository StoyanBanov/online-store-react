import { useEffect, useState } from "react"
import { getItems } from "../../data/services/itemService"

import { useParams, useSearchParams } from "react-router-dom"
import { ItemCard } from "./ItemCard"

import style from './style.module.css'

export const Catalog = () => {

    const [items, setItems] = useState([])

    let [searchParams] = useSearchParams();
    const { categoryId } = useParams()

    useEffect(() => {
        getItems({ search: searchParams.get('search'), categoryId })
            .then(setItems)
    }, [searchParams, categoryId])


    return (
        <div className={style.catalogContainer}>
            {items.map(i => <ItemCard key={i._id} item={i} />)}
        </div>
    )
}