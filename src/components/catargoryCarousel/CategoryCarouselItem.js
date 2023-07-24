import { useCallback } from 'react'
import style from './style.module.css'

import { useNavigate } from "react-router-dom"

export const CategoryCarouselItem = ({ item, styleRight }) => {
    const navigate = useNavigate()

    const itemClickHandler = useCallback(() => {
        navigate(`/catalog/${item._id}`)
    }, [navigate, item._id])

    return (
        <div onClick={itemClickHandler} style={{ right: styleRight }} className={style.carouselItem}>
            <img className={style.carouselItemThumbnail} src={'http://localhost:3030/static/images/' + item.thumbnail} alt={`${item.title} thumbnail`} />
            <div>
                <h3>{item.title}</h3>
                <p>Price: {item.price}</p>
            </div>
        </div>
    )
}