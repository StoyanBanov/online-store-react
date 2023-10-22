import { HiddenSub } from "../../common/helpers/hiddenSub/HiddenSub"

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
                    <p><b>Address:</b> {purchase.address}</p>
                    <p><b>Total sum:</b> {purchase.items.reduce((t, { item: { price }, count }) => t + price * count, 0)}$</p>
                </div>
            </HiddenSub>
        </li>
    )
}