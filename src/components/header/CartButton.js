import { useCallback, useContext, useEffect } from 'react'
import style from './style.module.css'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../common/context/CartContext'
import { ShoppingCart } from '../shoppingCart/ShoppingCart'
import { CartSVG } from '../common/helpers/CartSVG'

let isHovering = false

export const CartButton = () => {
    const { scrollY, windowWidth } = useContext(DimensionsContext)

    const navigate = useNavigate()

    const { cartDropDownRef, cart } = useContext(CartContext)

    useEffect(() => {
        if (cartDropDownRef.current.style.display === 'none' && cart.items.length) {
            cartDropDownRef.current.style.display = 'block'
            setTimeout(() => !isHovering && (cartDropDownRef.current.style.display = 'none'), 2000)
        }
    }, [cartDropDownRef, cart.items])

    const cartClickHandler = useCallback(() => {
        navigate('/cart')
    }, [navigate])

    const cartHoverHandler = useCallback(e => {
        if (e.type === 'mouseenter') {
            cartDropDownRef.current.style.display = 'block'
            isHovering = true
        } else {
            isHovering = false
            setTimeout(() => !isHovering && (cartDropDownRef.current.style.display = 'none'), 700)
        }
    }, [cartDropDownRef])

    return (
        <div className={windowWidth > 330 ? style.cartDropContainer : style.cartDropContainerMobile} style={scrollY > 20 && windowWidth > 330 ? { marginTop: '70px' } : {}}>
            <div className={style.cartDiv}>
                <button
                    style={scrollY > 20 ? { boxShadow: '0 0 2px 0.5px white' } : {}}
                    onClick={cartClickHandler}
                    onMouseEnter={cartHoverHandler}
                    onMouseLeave={cartHoverHandler}
                >
                    <CartSVG />
                </button>
                <div
                    ref={cartDropDownRef}
                    onMouseEnter={cartHoverHandler}
                    onMouseLeave={cartHoverHandler}
                    style={{ display: 'none' }}
                >
                    <ShoppingCart />
                </div>
            </div>
        </div>
    )
}