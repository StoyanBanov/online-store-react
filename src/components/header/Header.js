import { useNavigate } from "react-router-dom"
import { Nav } from "../nav/Nav"
import { Search } from "./Search"
import { ShoppingCart } from "../shoppingCart/ShoppingCart"

import style from './style.module.css'

import { useCallback, useRef } from "react"

export const Header = () => {
    const navigate = useNavigate()

    const cartDiv = useRef()

    const cartClickHandler = useCallback(() => {
        navigate('/cart')
    }, [navigate])

    const cartHoverHandler = useCallback(e => {
        if (e.type === 'mouseover') {
            cartDiv.current.style.display = 'block'
        } else {
            cartDiv.current.style.display = 'none'
        }
    }, [])

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

                <div className={style.cartDiv}>
                    <button
                        onClick={cartClickHandler}
                        onMouseOver={cartHoverHandler}
                        onMouseOut={cartHoverHandler}
                    >
                        Cart
                    </button>
                    <div
                        onMouseOver={cartHoverHandler}
                        onMouseOut={cartHoverHandler}
                        ref={cartDiv}
                        style={{ display: 'none' }}
                    >
                        <h1>cart</h1>
                        <ShoppingCart />
                    </div>
                </div>
            </div>
            <Nav />
        </>
    )
}