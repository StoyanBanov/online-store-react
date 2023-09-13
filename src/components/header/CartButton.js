import { useCallback, useContext } from 'react'
import style from './style.module.css'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../common/context/CartContext'
import { ShoppingCart } from '../shoppingCart/ShoppingCart'
import { CartSVG } from '../common/helpers/CartSVG'

export const CartButton = () => {
    const { scrollY, windowWidth } = useContext(DimensionsContext)

    const navigate = useNavigate()

    const { cartDropDownRef } = useContext(CartContext)

    const cartClickHandler = useCallback(() => {
        navigate('/cart')
    }, [navigate])

    const cartHoverHandler = useCallback(e => {
        if (e.type === 'mouseover') {
            cartDropDownRef.current.style.display = 'block'
        } else {
            cartDropDownRef.current.style.display = 'none'
        }
    }, [cartDropDownRef])

    return (
        <div className={windowWidth > 330 ? style.cartDropContainer : style.cartDropContainerMobile} style={scrollY > 20 && windowWidth > 330 ? { marginTop: '70px' } : {}}>
            <div className={style.cartDiv}>
                <button
                    style={scrollY > 20 ? { boxShadow: '0 0 2px 0.5px white' } : {}}
                    onClick={cartClickHandler}
                    onMouseOver={cartHoverHandler}
                    onMouseOut={cartHoverHandler}
                >
                    <CartSVG />
                </button>
                <div
                    ref={cartDropDownRef}
                    onMouseOver={cartHoverHandler}
                    onMouseOut={cartHoverHandler}
                    style={{ display: 'none' }}
                >
                    <ShoppingCart />
                </div>
            </div>
        </div>
    )
}