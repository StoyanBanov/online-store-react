import { useEffect, useState } from "react"
import { getItems } from "../../data/services/itemService"

import { useParams, useSearchParams } from "react-router-dom"
import { ItemCard } from "./ItemCard"

export const Catalog = () => {

    const [items, setItems] = useState([])

    const { search } = useSearchParams()
    const { categoryId } = useParams()

    useEffect(() => {
        getItems({ search, categoryId })
            .then(setItems)
    }, [search, categoryId])

    return (
        <div>
            {items.map(i => <ItemCard key={i._id} item={i} />)}
        </div>
    )
}