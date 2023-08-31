import { useEffect, useState } from "react"
import { CategoryCarousel } from "../catargoryCarousel/CategoryCarusel"
import { getTopChildCategories } from "../../data/services/itemService"

import style from './style.module.css'

export const Home = () => {
    const [topCats, setTopCats] = useState([])

    useEffect(() => {
        getTopChildCategories(3)
            .then(setTopCats)
    }, [])

    return (
        <div className={style.homeCarousels}>
            {topCats.map(c => <CategoryCarousel key={c._id} category={c} />)}
        </div>
    )
}