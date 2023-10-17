import { useEffect, useState } from "react"
import { getAllNonVerifiedPurchases } from "../../../data/services/userService"

export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        getAllNonVerifiedPurchases().then(setPurchases)
    }, [])

    return (
        <div>
            <ul>
                {
                    purchases.map(p => <li key={p._id}>{p.address}</li>)
                }
            </ul>
        </div>
    )
}