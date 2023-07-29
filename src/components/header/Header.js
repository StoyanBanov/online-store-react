import { useNavigate } from "react-router-dom"
import { Nav } from "./nav/Nav"
import { Search } from "./Search"
import { ShoppingCart } from "../shoppingCart/ShoppingCart"

import style from './style.module.css'

import { useCallback, useContext, useRef } from "react"
import { CartContext } from "../common/context/CartContext"

export const Header = () => {
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

    const homeClickHandler = useCallback(() => {
        navigate('/')
    }, [navigate])

    return (
        <>
            <div className={style.searchContainer}>
                <p onClick={homeClickHandler} className={style.typeText}>
                    <span className={style.typeLower}>ne</span>
                    <span className={style.typeUpper}>MAG</span>
                </p>

                <Search />

                <div className={style.cartDropContainer}>
                    <div className={style.cartDiv}>
                        <button
                            onClick={cartClickHandler}
                            onMouseOver={cartHoverHandler}
                            onMouseOut={cartHoverHandler}
                        >
                            Cart
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

            </div>
            <Nav />
        </>
    )
}