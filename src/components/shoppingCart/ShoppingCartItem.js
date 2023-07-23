import { useContext } from 'react'
import style from './style.module.css'
import { CartContext } from '../common/context/CartContext'

export const ShoppingCartItem = ({ itemObj: { item, count, _id } }) => {
    const { removeFromCart, changeItemCount } = useContext(CartContext)

    const CountChangeHandler = e => {
        changeItemCount(item._id, e.target.value)
    }

    const RemoveItemHandler = () => {
        removeFromCart({ item, _id })
    }

    return (
        <div className={style.cartItemContainer}>
            <h4>{item.title}</h4>
            <input type='number' min={1} max={item.count} defaultValue={count} onChange={CountChangeHandler}></input>
            <button onClick={RemoveItemHandler}>Remove</button>
        </div>
    )
}