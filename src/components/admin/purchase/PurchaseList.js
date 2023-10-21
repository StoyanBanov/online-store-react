import { useCallback, useEffect, useState } from "react"
import { editPurchase, getAllNonCompletedPurchases } from "../../../data/services/userService"
import { PurchaseListItem } from "./purchaseListItem"

export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        getAllNonCompletedPurchases().then(setPurchases)
    }, [])

    const updatePurchaseListHandler = useCallback(async (purchase, key, val) => {
        const updatedPurchase = await editPurchase(purchase._id, { ...purchase, [key]: val })

        setPurchases(state => {
            const index = state.findIndex(p => p._id === updatedPurchase._id)
            return [
                ...state.slice(0, index),
                updatedPurchase,
                ...state.slice(index + 1)
            ]
        })
    }, [])

    return (
        <div>
            <ul>
                {
                    purchases.map(p => <PurchaseListItem key={p._id} purchase={p} updatePurchaseListHandler={updatePurchaseListHandler} />)
                }
            </ul>
        </div>
    )
}