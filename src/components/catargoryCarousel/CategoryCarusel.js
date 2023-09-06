import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { getItems } from "../../data/services/itemService"
import { CategoryCarouselItem } from "./CategoryCarouselItem"

import style from './style.module.css'
import { CarouselArrowButton } from "./CarouselArrowButton"
import { Link, useNavigate } from "react-router-dom"
import { useCarousel } from "../common/hooks/useCarousel"
import { DimensionsContext } from "../common/context/DimensionsContext"
import { VISIBLE_ITEMS_COUNT } from "./constants"

export const CategoryCarousel = ({ category }) => {
    const [items, setItems] = useState([])

    const navigate = useNavigate()

    const { windowWidth } = useContext(DimensionsContext)

    const carouselDiv = useRef()

    useEffect(() => {
        getItems({ catId: category._id, itemsPerPage: 15 })
            .then(i => setItems([...i, ...i, ...i, ...i, ...i, ...i])) //for tests
    }, [category])

    const [slideHandler, displayCarouselButtons, setInitialWidth] = useCarousel(carouselDiv)

    const [itemWidth, setItemWidth] = useState()

    useEffect(() => {
        if (carouselDiv.current) {
            setInitialWidth()
            let divisor = VISIBLE_ITEMS_COUNT[Object.keys(VISIBLE_ITEMS_COUNT).sort((a, b) => a - b).find(k => k >= windowWidth)] || 7

            setItemWidth(carouselDiv.current.parentElement.offsetWidth / divisor - 10)
        }
    }, [carouselDiv, setInitialWidth, items, windowWidth])

    const categoryClickHandler = useCallback(() => {
        navigate(`/catalog/${category.title}/${category._id}`)
    }, [navigate, category])

    return (
        <div style={{ fontSize: itemWidth / 12 + 'px' }} className={style.carouselContainer}>
            <Link to={`/catalog/${category.title}/${category._id}`}><h2>{category.title}</h2></Link>

            <div className={style.carousel}>
                {displayCarouselButtons.left &&
                    <CarouselArrowButton slideHandler={slideHandler} direction={'left'} />
                }

                <div style={{ height: itemWidth * 1.6 + 'px' }} className={style.carouselItemsContainer}>
                    <div ref={carouselDiv} className={style.carouselItems}>
                        {items.map((item, index) =>
                            <CategoryCarouselItem
                                width={itemWidth}
                                key={index}
                                item={item}
                                cat={category}
                            />
                        )}

                        <div
                            style={{ width: itemWidth + 'px' }}
                            onClick={categoryClickHandler}
                            className={style.carouselItem}
                        >
                            <img src={`http://localhost:3030/static/images/${category.thumbnail}`} alt={category.title} />
                            <h2 style={{ fontSize: itemWidth / category.title.length * 1.28 + 'px', top: -itemWidth / category.title.length * 1.28 / 2 + 'px' }}>
                                {itemWidth &&
                                    new Array(Math.trunc(itemWidth * 1.6 / (itemWidth / category.title.length)) - 1).fill(category.title).map(t => <span style={{ height: itemWidth / category.title.length * 1.2 + 'px' }}>{t}</span>)
                                }
                            </h2>
                        </div>
                    </div>
                </div>

                {displayCarouselButtons.right &&
                    <CarouselArrowButton slideHandler={slideHandler} direction={'right'} />
                }
            </div>
        </div>
    )
}