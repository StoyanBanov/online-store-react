import { useCallback, useEffect, useRef, useState } from "react"
import { getItems } from "../../data/services/itemService"
import { CategoryCarouselItem } from "./CategoryCarouselItem"

import style from './style.module.css'
import { CarouselArrowButton } from "./CarouselArrowButton"
import { Link, useNavigate } from "react-router-dom"
import { useCarousel } from "../common/hooks/useCarousel"

export const CategoryCarousel = ({ category }) => {
    const [items, setItems] = useState([])

    const navigate = useNavigate()

    const carouselDiv = useRef()

    useEffect(() => {
        getItems({ catId: category._id, itemsPerPage: 15 })
            .then(i => setItems([...i, ...i, ...i, ...i, ...i, ...i])) //for tests
    }, [category])

    const [slideHandler, displayCarouselButtons] = useCarousel(carouselDiv)

    const categoryClickHandler = useCallback(() => {
        navigate(`/catalog/${category.title}/${category._id}`)
    }, [navigate, category])

    return (
        <div className={style.carouselContainer}>
            <Link to={`/catalog/${category.title}/${category._id}`}><h2>{category.title}</h2></Link>

            <div className={style.carousel}>
                {displayCarouselButtons.left &&
                    <CarouselArrowButton slideHandler={slideHandler} direction={'left'} />
                }

                <div className={style.carouselItemsContainer}>
                    <div ref={carouselDiv} className={style.carouselItems}>
                        {items.map((item, index) =>
                            <CategoryCarouselItem
                                key={index}
                                item={item}
                                cat={category}
                            />
                        )}
                        {items.length &&
                            <div
                                onClick={categoryClickHandler}
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
                </div>

                {displayCarouselButtons.right &&
                    <CarouselArrowButton slideHandler={slideHandler} direction={'right'} />
                }
            </div>
        </div>
    )
}