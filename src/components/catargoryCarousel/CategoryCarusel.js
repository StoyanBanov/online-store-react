import { useCallback, useEffect, useRef, useState } from "react"
import { getItems } from "../../data/services/itemService"
import { CategoryCarouselItem } from "./CategoryCarouselItem"

import style from './style.module.css'
import { CarouselArrowButton } from "./CarouselArrowButton"

let isSliding = false

export const CategoryCarousel = ({ category }) => {
    const [items, setItems] = useState([])

    const carouselDiv = useRef()

    useEffect(() => {
        getItems({ categoryId: category._id, limit: 15 })
            .then(i => setItems([...i, ...i, ...i, ...i, ...i, ...i])) //for tests
    }, [category, carouselDiv])

    const slideHandler = useCallback((e, direction) => {
        e.preventDefault()

        if (isSliding) return

        const items = carouselDiv.current.children
        const carouselDivWidth = carouselDiv.current.offsetWidth

        if ((direction === 'left' && items[0].offsetLeft === 0)
            || (direction === 'right' && items[items.length - 1].offsetLeft < carouselDivWidth && items[items.length - 1].offsetLeft > 0)) {
            return
        }

        isSliding = true

        const step = carouselDivWidth / 50

        let totalSteps = 0
        const interval = setInterval(() => {
            totalSteps += step

            if (totalSteps >= carouselDivWidth) {
                totalSteps = carouselDivWidth
                clearInterval(interval)
                isSliding = false
            }

            for (const item of items) {
                item.style.left = item.offsetLeft + (direction === 'left' ? step : -step) + 'px'
            }

        }, 10)

    }, [carouselDiv])

    return (
        <div className={style.carouselContainer}>
            <h2>{category.title}</h2>

            <div className={style.carousel}>
                <CarouselArrowButton slideHandler={slideHandler} direction={'left'} />

                <div ref={carouselDiv} className={style.carouselItems}>
                    {items.map((item, index) =>
                        <CategoryCarouselItem
                            key={index}
                            styleRight={carouselDiv.current.offsetWidth - (index + 1) * (carouselDiv.current.offsetWidth / 5) + 'px'}
                            item={item}
                        />
                    )}
                </div>

                <CarouselArrowButton slideHandler={slideHandler} direction={'right'} />
            </div>
        </div>
    )
}