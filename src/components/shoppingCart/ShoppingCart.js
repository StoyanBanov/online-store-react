import { ShoppingCartItem } from "./ShoppingCartItem"
import { useCart } from "../common/hooks/useCart"

export const ShoppingCart = () => {
    const { cart, purchaseClickHandler, emptyCartClickHandler } = useCart()

    return (
        <div>
            {cart?.items?.map((itemObj) => <ShoppingCartItem key={itemObj.item._id} itemObj={itemObj} />)}
            <p>Total: {cart.totalPrice}</p>
            <button onClick={purchaseClickHandler}>Purchase</button>
            <button onClick={emptyCartClickHandler}>Empty</button>
        </div>
    )
}