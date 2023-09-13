import { useCallback, useRef } from "react"
import { CartSVG } from "../common/helpers/CartSVG"
import { PopBefore } from "../common/helpers/popBefore/PopBefore"
import { usePop } from "../common/hooks/usePop"
import { ShoppingCart } from "../shoppingCart/ShoppingCart"

export const MobileCartButton = () => {
    const { displayPop: displayCart, displayPopHandler } = usePop()

    const cartRef = useRef()

    const mobileCartHandler = useCallback((isOpening) => {
        displayPopHandler(isOpening, cartRef)
    }, [displayPopHandler, cartRef])

    return (
        <>
            <svg onClick={mobileCartHandler} style={{ width: 30, height: 30 }}>
                <CartSVG />
            </svg>

            {displayCart &&
                <PopBefore popRef={cartRef} displayPopClickHandler={mobileCartHandler}>
                    <ShoppingCart />
                </PopBefore>
            }
        </>
    )
}