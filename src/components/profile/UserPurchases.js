import { useOutletContext } from "react-router-dom"
import { PurchaseItem } from "./PurchaseItem";
import { getTotalPrice } from "../../util";

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

                            <p>Total Price: {getTotalPrice(p.items)}</p>

                            <p>Recipient: {p.firstName} {p.lastName}</p>

                            <p>Payment Method: {p.paymentMethod}</p>

                            <p>Email: {p.email}</p>

                            <p>Phone: {p.phone}</p>

                            <p>Address: {p.address}</p>

                            <p>Status: {p.completed ? 'completed' : p.verified ? 'verified' : 'not yet verified'}</p>
                        </li>)
                }
            </ul>
        </div>
    )
}