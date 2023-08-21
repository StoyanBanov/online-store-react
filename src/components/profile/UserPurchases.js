import { useOutletContext } from "react-router-dom"

export const UserPurchases = () => {
    const { userData: { purchases } } = useOutletContext()

    console.log(purchases);
    return (
        <div>
            <ul>
                {
                    purchases?.map(p => <li key={p._id}>{p.items.map(i => `${i}`)}; {p.address}</li>)
                }
            </ul>
        </div>
    )
}