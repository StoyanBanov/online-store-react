import { ShoppingCartItem } from "./ShoppingCartItem"
import { useCart } from "../common/hooks/useCart"

import style from './style.module.css'

export const ShoppingCart = () => {
    const { cart, purchaseClickHandler, emptyCartClickHandler } = useCart()

    return (
        <div className={style.cart}>
            <h2>Cart</h2>

            {cart?.items?.map((itemObj) => <ShoppingCartItem key={itemObj.item._id} itemObj={itemObj} />)}

            <p><strong>Total: {cart.totalPrice.toFixed(2)}$</strong></p>

            {cart.items && cart.items.length > 0 &&
                <>
                    <button onClick={purchaseClickHandler}>Purchase</button>
                    <button className={style.cartEmptyBtn} onClick={emptyCartClickHandler}>Empty</button>
                </>
            }
        </div>
    )
}