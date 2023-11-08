import { useCallback, useContext } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { addUserPurchase } from "../../data/services/userService"
import { CartContext } from "../common/context/CartContext"

import style from "./style.module.css"

export const PurchaseDetails = () => {
    const { purchase } = useOutletContext()

    const { emptyCart } = useContext(CartContext)

    const navigate = useNavigate()

    const CreatePurchase = useCallback(async () => {
        await addUserPurchase(purchase)

        await emptyCart()

        navigate('/')
    }, [navigate, emptyCart, purchase])

    return (
        <div className={style.purchaseDetailsContainer}>
            <div>
                <span className={style.title}>name: </span>
                {purchase.firstName} {purchase.lastName}
            </div>

            <div>
                <span className={style.title}>phone: </span>
                {purchase.phone}
            </div>

            <div>
                <span className={style.title}>e-mail: </span>
                {purchase.email}
            </div>

            <div>
                <span className={style.title}>Deliver </span> <span>to {purchase.deliverTo}: </span>
                {purchase.address}
            </div>

            <div>
                <span className={style.title}>payment </span> <span>method: </span>
                {purchase.paymentMethod}
            </div>

            {purchase.items.length > 0 &&
                <>
                    <div>
                        <span className={style.title}>products: </span>
                        <ul>
                            {purchase.items.map(({ item, count }) => <li key={item._id}>{count} X {item.title}</li>)}
                        </ul>
                    </div>

                    <div>
                        <span className={style.title}>total: </span>
                        {purchase.items.reduce(({ item: { price: p1 }, count: c1 }, { item: { price: p2 }, count: c2 }) => p1 * c1 + p2 * c2)}$
                    </div>
                </>
            }

            <div>
                <span className={style.title}>info: </span>
                {purchase.info}
            </div>

            <div>
                <button onClick={CreatePurchase}>Create purchase</button>
            </div>
        </div>
    )
}