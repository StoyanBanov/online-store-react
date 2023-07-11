import { useEffect, useState } from "react"
import { CategoryCarousel } from "../catargoryCarousel/CategoryCarusel"

export const Home = () => {
    const [topCats, setTopCats] = useState([])

    useEffect(() => {

    }, [])

    return (
        <div>
            <CategoryCarousel />
            <CategoryCarousel />
            <CategoryCarousel />
        </div>
    )
}