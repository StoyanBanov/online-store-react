import { ShoppingCartItem } from "./ShoppingCartItem"
import { useCart } from "../common/hooks/useCart"

import style from './style.module.css'

export const ShoppingCart = () => {
    const { cart, purchaseClickHandler, emptyCartClickHandler } = useCart()

    return (
        <div className={style.cart}>
            <h1>cart</h1>
            {cart?.items?.map((itemObj) => <ShoppingCartItem key={itemObj.item._id} itemObj={itemObj} />)}
            <p>Total: {cart.totalPrice}$</p>
            <button onClick={purchaseClickHandler}>Purchase</button>
            <button onClick={emptyCartClickHandler}>Empty</button>
        </div>
    )
}