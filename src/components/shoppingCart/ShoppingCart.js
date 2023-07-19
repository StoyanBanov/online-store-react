import { useContext } from "react"
import { CartContext } from "../common/context/CartContext"

export const ShoppingCart = () => {
    const { cart } = useContext(CartContext)
    return (
        <div>
            {cart?.items?.map(({ item, count }) => <p key={item._id}>{item.title} - {count}</p>)}
            Total: {cart.totalPrice}
        </div>
    )
}