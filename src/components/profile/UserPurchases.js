import { useOutletContext } from "react-router-dom"
import { PurchaseItem } from "./PurchaseItem";

export const UserPurchases = () => {
    const { userData: { purchases } } = useOutletContext()

    return (
        <div>
            <ul>
                {
                    purchases?.map(p => <li key={p._id}>{p.items.map(i => <PurchaseItem key={i.item._id} itemObj={i} />)} Address: {p.address}</li>)
                }
            </ul>
        </div>
    )
}