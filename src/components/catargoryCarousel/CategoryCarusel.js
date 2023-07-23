import { useCallback, useEffect, useState } from "react"
import { getItems } from "../../data/services/itemService"
import { CategoryCarouselItem } from "./CategoryCarouselItem"

import style from './style.module.css'
import { CarouselArrowButton } from "./CarouselArrowButton"

export const CategoryCarousel = ({ category }) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        getItems({ categoryId: category._id, limit: 15 })
            .then(setItems)
    }, [category])

    const nextSlideHandler = useCallback(e => {
        e.preventDefault()
        const items = document.getElementById('11').children
        let left = 20
        const interval = setInterval(() => {

            for (const item of items) {
                item.style.left = item.offsetLeft - left + 'px'
            }

            left += 10
        }, 25)
        setTimeout(() => {
            clearInterval(interval)
            setItems(
                state => [
                    ...state.slice(state.length / 3 * 2),
                    ...state.slice(0, state.length / 3 * 2)
                ]
            )
        }, 300)

    }, [])

    const prevSlideHandler = useCallback(e => {
        e.preventDefault()
        const items = document.getElementById('11').children
        let left = 20
        const interval = setInterval(() => {

            for (const item of items) {
                item.style.left = item.offsetLeft + left + 'px'
            }

            left += 10
        }, 25)
        setTimeout(() => {
            clearInterval(interval)
            setItems(
                state => [
                    ...state.slice(Math.ceil(state.length / 3)),
                    ...state.slice(0, Math.ceil(state.length / 3))
                ]
            )
        }, 300)
    }, [])

    return (
        <div>
            <h2>{category.title}</h2>

            <div className={style.carouselContainer}>
                <CarouselArrowButton clickHandler={prevSlideHandler} direction={'left'} />

                <div id="11" className={style.carouselItems}>
                    {items.slice(0, items.length / 2).map((item, index) => <CategoryCarouselItem key={item._id} item={item} index={index} />)}
                </div>

                <CarouselArrowButton clickHandler={nextSlideHandler} direction={'right'} />
            </div>
        </div>
    )
}