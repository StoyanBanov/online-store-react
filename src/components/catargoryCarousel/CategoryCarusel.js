import { useCallback, useEffect, useRef, useState } from "react"
import { getItems } from "../../data/services/itemService"
import { CategoryCarouselItem } from "./CategoryCarouselItem"

import style from './style.module.css'
import { CarouselArrowButton } from "./CarouselArrowButton"
import { Link, useNavigate } from "react-router-dom"

let isSliding = false

export const CategoryCarousel = ({ category }) => {
    const [items, setItems] = useState([])

    const navigate = useNavigate()

    const carouselDiv = useRef()

    useEffect(() => {
        if (carouselDiv.current) {
            getItems({ catId: category._id, itemsPerPage: 15 })
                .then(i => setItems([...i, ...i, ...i, ...i, ...i, ...i])) //for tests
        }
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

    const categoryClickHandler = useCallback(() => {
        navigate(`/catalog/${category.title}/${category._id}`)
    }, [navigate, category])

    return (
        <div className={style.carouselContainer}>
            <Link to={`/catalog/${category.title}/${category._id}`}><h2>{category.title}</h2></Link>

            <div className={style.carousel}>
                <CarouselArrowButton slideHandler={slideHandler} direction={'left'} />

                <div ref={carouselDiv} className={style.carouselItems}>
                    {items.map((item, index) =>
                        <CategoryCarouselItem
                            key={index}
                            styleRight={carouselDiv.current.offsetWidth - (index + 1) * 200 + 'px'}
                            item={item}
                            cat={category}
                        />
                    )}
                    {items.length &&
                        <div
                            onClick={categoryClickHandler}
                            style={{ right: carouselDiv.current.offsetWidth - (items.length) * 200 + 'px' }}
                            className={style.carouselItem}
                        >
                            <div>
                                <img src={`http://localhost:3030/static/images/${category.thumbnail}`} alt={category.title}></img>
                                <h2>
                                    <span>{category.title}</span>
                                    <span>{category.title}</span>
                                    <span>{category.title}</span>
                                    <span>{category.title}</span>
                                    <span>{category.title}</span>
                                </h2>
                            </div>
                        </div>
                    }
                </div>

                <CarouselArrowButton slideHandler={slideHandler} direction={'right'} />
            </div>
        </div>
    )
}