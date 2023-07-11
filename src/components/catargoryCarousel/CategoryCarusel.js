import { useEffect, useState } from "react"
import { getItemsForCategory } from "../../data/services/itemService"

export const CategoryCarousel = ({ categoryId = '64ac2bf0d62fbec1583e40a6' }) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        getItemsForCategory(categoryId)
            .then(data => {
                console.log(data);
                setItems(data)
            })
    }, [categoryId])

    return (
        <div>
            <ol>
                {items.map(i => <p>{i.title}</p>)}
            </ol>
        </div>
    )
}