import { useContext } from "react"
import { CartContext } from "../common/context/CartContext"
import { ShoppingCartItem } from "./ShoppingCartItem"
import { useNavigate } from "react-router-dom"

export const ShoppingCart = () => {
    const { cart } = useContext(CartContext)

    const navigate = useNavigate()

    const purchaseClickHandler = () => {
        navigate('/purchase')
    }

    return (
        <div>
            {cart?.items?.map((itemObj) => <ShoppingCartItem key={itemObj.item._id} itemObj={itemObj} />)}
            <p>Total: {cart.totalPrice}</p>
            <button onClick={purchaseClickHandler}>Purchase</button>
        </div>
    )
}