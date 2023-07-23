import { useCallback, useContext } from "react"
import { CartContext } from "../common/context/CartContext"
import { ShoppingCartItem } from "./ShoppingCartItem"
import { useNavigate } from "react-router-dom"

export const ShoppingCart = () => {
    const { cart, emptyCart } = useContext(CartContext)

    const navigate = useNavigate()

    const purchaseClickHandler = useCallback(() => {
        navigate('/purchase')
    }, [navigate])

    const emptyCartClickHandler = useCallback(() => {
        emptyCart(cart._id)
    }, [emptyCart, cart._id])

    return (
        <div>
            {cart?.items?.map((itemObj) => <ShoppingCartItem key={itemObj.item._id} itemObj={itemObj} />)}
            <p>Total: {cart.totalPrice}</p>
            <button onClick={purchaseClickHandler}>Purchase</button>
            <button onClick={emptyCartClickHandler}>Empty</button>
        </div>
    )
}