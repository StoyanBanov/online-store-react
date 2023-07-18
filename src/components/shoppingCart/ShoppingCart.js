import { useContext, useEffect, useReducer } from "react"
import { AuthContext } from "../common/context/AuthContext"
import { getCartBydId } from "../../data/services/shoppingCartService"

function reducer(state, action) {
    if (action.type === 'setCart') {
        return action.cart
    }
}

export const ShoppingCart = () => {
    const { user: { shoppingCart } } = useContext(AuthContext)

    const [cart, dispatch] = useReducer(reducer, { items: [] })

    useEffect(() => {
        if (shoppingCart) {
            getCartBydId(shoppingCart)
                .then(userCart => {
                    console.log(userCart);
                    dispatch({ type: 'setCart', cart: userCart })
                    sessionStorage.removeItem('cart')
                })
        } else {
            let guestCart = JSON.parse(sessionStorage.getItem('cart'))
            if (guestCart)
                dispatch({ type: 'setCart', cart: guestCart })
            else
                sessionStorage.setItem('cart', JSON.stringify({ items: [] }))
        }
    }, [shoppingCart])

    return (
        <div>
            {cart?.items?.map(({ item, count }) => <p key={item._id}>{item.title} - {count}</p>)}
        </div>
    )
}