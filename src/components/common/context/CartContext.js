import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { getCartBydId, addToCartBydId } from "../../../data/services/shoppingCartService"
import { AuthContext } from "./AuthContext";

export const CartContext = createContext()

const emptyCart = { items: [], totalPrice: 0 }

export const CartContextProvider = ({ children }) => {
    const { user: { shoppingCart, _id } } = useContext(AuthContext)

    const reducer = useCallback((state, action) => {
        let changedCart

        switch (action.type) {
            case 'setCart':
                changedCart = action.cart
                break;
            case 'addToCart':
                if (state.items.find(i => i.item._id === action.itemObj.item._id))
                    return state

                changedCart = {
                    items: [...state.items, action.itemObj],
                    totalPrice: state.totalPrice + action.itemObj.item.price * action.itemObj.count
                }
                break
            default:
                return state;
        }

        if (!_id) sessionStorage.setItem('cart', JSON.stringify(changedCart))

        return changedCart
    }, [_id])

    const [cart, dispatch] = useReducer(reducer, { ...emptyCart })

    useEffect(() => {
        if (shoppingCart) {
            getCartBydId(shoppingCart)
                .then(userCart => {
                    dispatch({ type: 'setCart', cart: userCart })
                    sessionStorage.removeItem('cart')
                })
        } else {
            let guestCart = JSON.parse(sessionStorage.getItem('cart'))
            if (guestCart) {
                dispatch({ type: 'setCart', cart: guestCart })
            } else {
                sessionStorage.setItem('cart', JSON.stringify({ ...emptyCart }))
                dispatch({ type: 'setCart', cart: { ...emptyCart } })
            }
        }
    }, [shoppingCart])

    const addToCart = useCallback(async (item, count = 1) => {
        if (_id)
            await addToCartBydId(cart._id, { item: item._id, count })

        dispatch({ type: 'addToCart', itemObj: { item, count } })
    }, [cart._id, _id])

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}