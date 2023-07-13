import { useCallback, useEffect, useState } from "react"
import { getItems } from "../../data/services/itemService"
import { CategoryCarouselItem } from "./CategoryCarouselItem"

import style from './style.module.css'

export const CategoryCarousel = ({ category }) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        getItems({ categoryId: category._id })
            .then(setItems)
    }, [category])

    const nextSlideHandler = useCallback(e => {
        e.preventDefault()
        setItems(state => [...state.slice(1), state[0]])
    }, [])

    const prevSlideHandler = useCallback(e => {
        e.preventDefault()
        setItems(state => [state[state.length - 1], ...state.slice(0, -1)])
    }, [])

    return (
        <>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
            <div className="container">

                <h2>{category.title}</h2>

                <div id="myCarousel" className="carousel slide" data-ride="carousel">

                    <div className={"carousel-inner " + style.carouselContainer}>
                        {items.map((item, index) => <CategoryCarouselItem key={item._id} item={item} index={index} />)}
                    </div>

                    <a onClick={prevSlideHandler} className="left carousel-control" href="#myCarousel">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a onClick={nextSlideHandler} className="right carousel-control" href="#myCarousel">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </>
    )
}