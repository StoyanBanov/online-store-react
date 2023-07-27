import { useCallback, useContext } from 'react'
import style from './style.module.css'

import { useNavigate } from "react-router-dom"
import { CartContext } from '../common/context/CartContext'

export const CategoryCarouselItem = ({ item, styleRight, cat }) => {
    const { addToCart } = useContext(CartContext)

    const navigate = useNavigate()

    const itemClickHandler = useCallback(() => {
        navigate(`/catalog/${cat.title}/${cat._id}/${item._id}`)
    }, [navigate, item._id, cat])

    return (
        <div style={{ right: styleRight }} className={style.carouselItem}>
            <img onClick={itemClickHandler} className={style.carouselItemThumbnail} src={'http://localhost:3030/static/images/' + item.thumbnail} alt={`${item.title} thumbnail`} />
            <div>
                <h3 onClick={itemClickHandler}>{item.title}</h3>
                <p>Price: {item.price}</p>
                <button onClick={e => addToCart(item, 1)}><img src='' alt='Cart' /></button>
            </div>
        </div>
    )
}