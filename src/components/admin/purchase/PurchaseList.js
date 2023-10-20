import { useCallback, useEffect, useState } from "react"
import { editPurchase, getAllNonCompletedPurchases } from "../../../data/services/userService"
import { HiddenSub } from "../../common/helpers/hiddenSub/HiddenSub"

export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        getAllNonCompletedPurchases().then(setPurchases)
    }, [])

    const UpdatePurchaseHandler = useCallback(async (purchase, key, val) => {
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
                    purchases.map(p =>
                        <li key={p._id}>
                            <HiddenSub
                                title={
                                    <div>
                                        {new Date(p.createdOn).toString().split(' ').slice(0, 5).join(' ')}

                                        {!p.verified &&
                                            <button onClick={() => UpdatePurchaseHandler(p, 'verified', true)}>Verify</button>
                                        }

                                        <button onClick={() => UpdatePurchaseHandler(p, 'completed', true)}>Complete</button>
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