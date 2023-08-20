import { useOutletContext } from "react-router-dom"

export const UserPurchases = () => {
    const userData = useOutletContext()

    return (
        <div>userPurchases</div>
    )
}