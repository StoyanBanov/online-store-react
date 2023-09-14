import { useCallback, useContext } from 'react'
import { CartContext } from '../../context/CartContext'

import style from './style.module.css'
import { CartSVG } from '../CartSVG'

export const AddToCartButton = ({ item, containerWidth }) => {
    const { addToCart } = useContext(CartContext)

    const addToCartHandler = useCallback(async () => {
        await addToCart(item, 1)
    }, [addToCart, item])

    return (
        <button style={containerWidth ? { fontSize: containerWidth / 15 } : {}} className={style.addToCartBtn} onClick={addToCartHandler}>

            <CartSVG dim={containerWidth ? containerWidth / 7 : 30} />

            <span>
                <strong>ADD TO CART</strong>
            </span>
        </button>
    )
}