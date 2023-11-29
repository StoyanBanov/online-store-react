import { useOutletContext } from "react-router-dom"
import { PurchaseItem } from "./PurchaseItem";

export const UserPurchases = () => {
    const { userData: { purchases } } = useOutletContext()

    return (
        <div>
            <ul>
                {
                    purchases?.map(p =>
                        <li key={p._id}>
                            <ol>
                                {p.items.map(i => <PurchaseItem key={i.item._id} itemObj={i} />)}
                            </ol>

                            <p>Address: {p.address}</p>
                        </li>)
                }
            </ul>
        </div>
    )
}