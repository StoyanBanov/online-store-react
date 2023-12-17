import { useCallback } from 'react'
import style from './style.module.css'

import { useNavigate } from "react-router-dom"
import { AddToCartButton } from '../common/helpers/addToCartButton/AddToCartButton'
import { IMAGES_DIR } from '../../constants'
import { Price } from '../common/helpers/price/Price'

export const CategoryCarouselItem = ({ item, cat, width }) => {
    const navigate = useNavigate()

    const itemClickHandler = useCallback(() => {
        navigate(`/catalog/${cat.title}/${cat._id}/${item._id}`)
    }, [navigate, item._id, cat])

    return (
        <div style={{ width: width + 'px' }} className={style.carouselItem}>
            <img
                onClick={itemClickHandler}
                className={style.carouselItemThumbnail}
                src={`${IMAGES_DIR}/${item.thumbnail}`}
                alt={`${item.title} thumbnail`}
            />

            <div>
                <h3 onClick={itemClickHandler}>{item.title}</h3>

                <Price item={item} />

                <div style={{ width: width - 20, display: 'flex', justifyContent: 'center', marginTop: `${width / 10}px` }}>
                    <AddToCartButton item={item} containerWidth={width} />
                </div>
            </div>
        </div>
    )
}