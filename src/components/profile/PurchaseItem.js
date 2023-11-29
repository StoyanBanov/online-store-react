import { Link } from "react-router-dom"

export const PurchaseItem = ({ itemObj }) => {
    return (
        <li key={itemObj.item._id}>
            {itemObj.count}
            <span> of </span>
            <Link to={`/catalog/${itemObj.item._id}`}>{itemObj.item.title}</Link>
            <span> for </span>
            {(itemObj.item.price * itemObj.count).toFixed(2)}$
        </li>
    )
}