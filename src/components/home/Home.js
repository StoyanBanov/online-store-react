import { useEffect, useState } from "react"
import { CategoryCarousel } from "../catargoryCarousel/CategoryCarusel"
import { getTopChildCategories } from "../../data/services/itemService"

export const Home = () => {
    const [topCats, setTopCats] = useState([])

    useEffect(() => {
        getTopChildCategories(3)
            .then(setTopCats)
    }, [])

    //for testing purposes
    return (
        <div>
            {[...topCats, ...topCats, ...topCats].map(c => <CategoryCarousel key={c._id} category={c} />)}
        </div>
    )
}