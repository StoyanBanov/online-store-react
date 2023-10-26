import { HiddenSub } from "../../common/helpers/hiddenSub/HiddenSub"
import { Link } from 'react-router-dom'

export const PurchaseListItem = ({ purchase, updatePurchaseListHandler }) => {
    const updatedPurchaseHandler = e => {
        updatePurchaseListHandler(purchase, e.target.name, true)
    }

    return (
        <li key={purchase._id}>
            <HiddenSub
                title={
                    <div>
                        {new Date(purchase.createdOn).toString().split(' ').slice(0, 5).join(' ')}

                        {purchase.verified
                            ? <span> Verified </span>
                            : <button name="verified" onClick={updatedPurchaseHandler}>Verify</button>
                        }

                        <button name="completed" onClick={updatedPurchaseHandler}>Complete</button>
                    </div>}
            >
                <div>
                    <p><b>Recipient:</b> {purchase.firstName} {purchase.lastName}</p>
                    <p style={{ textTransform: "capitalize" }}><b>{purchase.deliverTo}:</b> {purchase.address}</p>
                    <p><b>Total sum:</b> {purchase.items.reduce((t, { item: { price }, count }) => t + price * count, 0)}$</p>

                    <span><b>Products:</b></span>
                    <ol>
                        {
                            purchase.items.map(({ item, count }) => <li key={item._id}><b>{item.count}</b> of <Link to={`/catalog/${item._id}`}><b>{item.title}</b></Link> for <b>{item.price * count}$</b></li>)
                        }
                    </ol>

                    <p><b>Info:</b> {purchase.info}</p>
                </div>
            </HiddenSub>
        </li>
    )
}