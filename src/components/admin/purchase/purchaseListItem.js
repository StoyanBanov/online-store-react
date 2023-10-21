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

                        {!purchase.verified &&
                            <button name="verified" onClick={updatedPurchaseHandler}>Verify</button>
                        }

                        <button name="completed" onClick={updatedPurchaseHandler}>Complete</button>
                    </div>}
            >
                {purchase.firstName} {purchase.lastName}
                {purchase.address}
            </HiddenSub>
        </li>
    )
}