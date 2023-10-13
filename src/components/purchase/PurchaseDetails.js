import { useCallback, useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { addUserPurchase } from "../../data/services/userService"
import { CartContext } from "../common/context/CartContext"

export const PurchaseDetails = () => {
    const { purchase } = useOutletContext()

    const { emptyCart } = useContext(CartContext)

    const CreatePurchase = useCallback(async () => {
        await addUserPurchase(purchase)

        await emptyCart()
    }, [emptyCart, purchase])

    return (
        <div>
            address: {purchase.address}
            <button onClick={CreatePurchase}>Create purchase</button>
        </div>
    )
}