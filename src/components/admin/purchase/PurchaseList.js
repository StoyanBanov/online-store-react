import { useEffect, useState } from "react"
import { getAllNonVerifiedPurchases } from "../../../data/services/userService"
import { HiddenSub } from "../../common/helpers/hiddenSub/HiddenSub"

export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        getAllNonVerifiedPurchases().then(setPurchases)
    }, [])

    console.log(purchases[0]);

    return (
        <div>
            <ul>
                {
                    purchases.map(p => <li key={p._id}><HiddenSub title={p.createdOn}>{p.address}</HiddenSub></li>)
                }
            </ul>
        </div>
    )
}