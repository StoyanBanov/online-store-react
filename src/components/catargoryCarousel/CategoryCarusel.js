import { useCallback, useEffect, useRef, useState } from "react"
import { getItems } from "../../data/services/itemService"
import { CategoryCarouselItem } from "./CategoryCarouselItem"

import style from './style.module.css'
import { CarouselArrowButton } from "./CarouselArrowButton"

export const CategoryCarousel = ({ category }) => {
    const [items, setItems] = useState([])

    const carouselDiv = useRef()

    useEffect(() => {
        getItems({ categoryId: category._id, limit: 15 })
            .then(i => setItems([...i, ...i, ...i, ...i, ...i, ...i])) //for tests
    }, [category, carouselDiv])

    const slideHandler = useCallback((e, direction) => {
        e.preventDefault()
        const items = carouselDiv.current.children
        const carouselDivWidth = carouselDiv.current.offsetWidth

        if (direction === 'left' && items[0].offsetLeft === 0) return
        if (direction === 'right' && items[items.length - 1].offsetLeft < carouselDivWidth && items[items.length - 1].offsetLeft > 0) return

        const step = carouselDivWidth / 50

        let totalSteps = 0
        const interval = setInterval(() => {
            totalSteps += step

            if (totalSteps >= carouselDivWidth) {
                totalSteps = carouselDivWidth
                clearInterval(interval)
            }

            for (const item of items) {
                item.style.left = item.offsetLeft + (direction === 'left' ? step : -step) + 'px'
            }

        }, 10)

    }, [carouselDiv])

    return (
        <div>
            <h2>{category.title}</h2>

            <div className={style.carouselContainer}>
                <CarouselArrowButton slideHandler={slideHandler} direction={'left'} />

                <div ref={carouselDiv} className={style.carouselItems}>
                    {items.map((item, index) => <CategoryCarouselItem key={index} item={item} index={index} />)}
                </div>

                <CarouselArrowButton slideHandler={slideHandler} direction={'right'} />
            </div>
        </div>
    )
}