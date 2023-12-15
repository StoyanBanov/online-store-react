import { useContext } from 'react'
import style from './style.module.css'
import { CartContext } from '../common/context/CartContext'
import { trimText } from '../../util'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { IMAGES_DIR } from '../../constants'
import { Price } from '../common/helpers/price/Price'

export const ShoppingCartItem = ({ itemObj: { item, count, _id } }) => {
    const { removeFromCart, changeItemCount } = useContext(CartContext)

    const { windowWidth } = useContext(DimensionsContext)

    const CountChangeHandler = e => {
        changeItemCount(item._id, e.target.value)
    }

    const RemoveItemHandler = () => {
        removeFromCart({ item, _id })
    }

    return (
        <div className={style.cartItemContainer}>
            <div className={style.cartItemTop}>
                <img src={`${IMAGES_DIR}/${item.thumbnail}`} alt={item.name} />
                <div>
                    <h4>{trimText(item.title, windowWidth >= 300 ? 15 : 10)}</h4>
                    {/* <span>{item.price.toFixed(2)}$</span> */}
                    <Price item={item} />
                </div>
            </div>

            <div className={style.cartItemBot}>
                <input type='number' min={1} max={item.count} value={count || 0} onChange={CountChangeHandler} />
                <button onClick={RemoveItemHandler}>
                    <svg width={20} height={20} stroke='black' strokeWidth={1}>
                        <line x1={2} y1={2} x2={18} y2={18} />
                        <line x1={2} y1={18} x2={18} y2={2} />
                    </svg>
                </button>
            </div>
        </div>
    )
}