import { useCallback, useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { addUserPurchase } from "../../data/services/userService"
import { CartContext } from "../common/context/CartContext"

import style from "./style.module.css"

export const PurchaseDetails = () => {
    const { purchase } = useOutletContext()

    const { emptyCart } = useContext(CartContext)

    const CreatePurchase = useCallback(async () => {
        await addUserPurchase(purchase)

        await emptyCart()
    }, [emptyCart, purchase])

    return (
        <div className={style.purchaseDetailsContainer}>
            <div>
                <span>name: </span>
                {purchase.firstName} {purchase.lastName}
            </div>
            <div>
                <span>address: </span>
                {purchase.address}
            </div>

            <div>
                <button onClick={CreatePurchase}>Create purchase</button>
            </div>
        </div>
    )
}