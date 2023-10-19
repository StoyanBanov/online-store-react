import { useCallback, useEffect, useState } from "react"
import { editPurchase, getAllNonCompletedPurchases } from "../../../data/services/userService"
import { HiddenSub } from "../../common/helpers/hiddenSub/HiddenSub"

export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        getAllNonCompletedPurchases().then(setPurchases)
    }, [])

    const CompletePurchaseHandler = useCallback(async purchase => {
        purchase.completed = true

    }, [])

    const VerifyPurchaseHandler = useCallback(async purchase => {
        const updatedPurchase = await editPurchase(purchase._id, { ...purchase, verified: true })

        setPurchases(state => [...state.slice(0, state.findIndex(p => p._id === updatedPurchase._id)), updatedPurchase, ...state.slice(state.findIndex(p => p._id === updatedPurchase._id) + 1)])
    }, [])

    return (
        <div>
            <ul>
                {
                    purchases.map(p =>
                        <li key={p._id}>
                            <HiddenSub
                                title={
                                    <div>
                                        {new Date(p.createdOn).toString().split(' ').slice(0, 5).join(' ')}

                                        {!p.verified &&
                                            <button onClick={() => VerifyPurchaseHandler(p)}>Verify</button>
                                        }

                                        <button onClick={() => CompletePurchaseHandler(p)}>Complete</button>
                                    </div>}
                            >
                                {p.firstName} {p.lastName}
                                {p.address}
                            </HiddenSub>
                        </li>)
                }
            </ul>
        </div>
    )
}