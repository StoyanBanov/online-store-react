import { useCallback } from 'react'
import style from './style.module.css'

import { useNavigate } from "react-router-dom"
import { AddToCartButton } from '../common/helpers/addToCartButton/AddToCartButton'

export const CategoryCarouselItem = ({ item, cat, width }) => {
    const navigate = useNavigate()

    const itemClickHandler = useCallback(() => {
        navigate(`/catalog/${cat.title}/${cat._id}/${item._id}`)
    }, [navigate, item._id, cat])

    return (
        <div style={{ width: width + 'px' }} className={style.carouselItem}>
            <img onClick={itemClickHandler} className={style.carouselItemThumbnail} src={'http://localhost:3030/static/images/' + item.thumbnail} alt={`${item.title} thumbnail`} />

            <div>
                <h3 onClick={itemClickHandler}>{item.title}</h3>
                <p>Price: {item.price.toFixed(2)}$</p>
                <AddToCartButton item={item} containerWidth={width} />
            </div>
        </div>
    )
}