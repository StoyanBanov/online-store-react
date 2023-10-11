import { createContext, useContext, useEffect, useReducer, useCallback, useRef } from "react";
import { getCartBydId, addToCartBydId, removeFromCartBydId, emptyCartBydId } from "../../../data/services/shoppingCartService"
import { AuthContext } from "./AuthContext";

export const CartContext = createContext()

const cartInitialState = { items: [], totalPrice: 0 }

export const CartContextProvider = ({ children }) => {
    const { user: { shoppingCart, _id } } = useContext(AuthContext)

    const cartDropDownRef = useRef()

    const reducer = useCallback((state, action) => {
        let changedCart

        switch (action.type) {
            case 'setCart':
                return action.cart
            case 'emptyCart':
                changedCart = { items: [] }
                break
            case 'addToCart':
                let oldItemIndex
                if ((oldItemIndex = state.items.findIndex(i => i.item._id === action.itemObj.item._id)) > -1) {
                    let oldItemObj = state.items[oldItemIndex]

                    if (oldItemObj.count < oldItemObj.item.count) {
                        changedCart = {
                            items: state.items.slice(0, oldItemIndex)
                                .concat([{ ...oldItemObj, count: oldItemObj.count + 1 }])
                                .concat(state.items.slice(oldItemIndex + 1))
                        }
                    } else {
                        window.alert('Product count limit already reached')
                        return state
                    }
                } else {
                    changedCart = {
                        items: [...state.items, action.itemObj]
                    }
                }
                break
            case 'removeFromCart':
                changedCart = {
                    items: state.items.filter(i => i.item._id !== action.itemId)
                }
                break
            case 'changeItemCount':
                const itemToChange = state.items.find(i => i.item._id === action.itemId)
                if (!itemToChange || action.newCount < 0 || itemToChange.item.count < action.newCount) return state

                changedCart = {
                    items:
                        [
                            ...state.items.slice(0, state.items.indexOf(itemToChange)),
                            {
                                ...itemToChange,
                                count: action.newCount
                            },
                            ...state.items.slice(state.items.indexOf(itemToChange) + 1)
                        ],
                }
                break
            default:
                return state;
        }

        changedCart.totalPrice = changedCart.items.reduce((total, i) => total + i.item.price * i.count, 0)
        changedCart._id = state._id

        if (!_id) localStorage.setItem('cart', JSON.stringify(changedCart))

        return changedCart
    }, [_id])

    const [cart, dispatch] = useReducer(reducer, { ...cartInitialState })

    useEffect(() => {
        if (shoppingCart) {
            getCartBydId(shoppingCart)
                .then(userCart => {
                    dispatch({ type: 'setCart', cart: userCart })
                    localStorage.removeItem('cart')
                })
        } else {
            let guestCart = JSON.parse(localStorage.getItem('cart'))
            if (guestCart) {
                dispatch({ type: 'setCart', cart: guestCart })
            } else {
                localStorage.setItem('cart', JSON.stringify({ ...cartInitialState }))
                dispatch({ type: 'setCart', cart: { ...cartInitialState } })
            }
        }
    }, [shoppingCart])

    const addToCart = useCallback(async (item, count = 1) => {
        if (_id)
            await addToCartBydId(cart._id, { item: item._id, count })

        dispatch({ type: 'addToCart', itemObj: { item, count } })
    }, [cart._id, _id])

    const removeFromCart = useCallback(async (itemObj) => {
        if (_id)
            await removeFromCartBydId(cart._id, itemObj._id)

        dispatch({ type: 'removeFromCart', itemId: itemObj.item._id })
    }, [cart._id, _id])

    const emptyCart = useCallback(async () => {
        if (_id)
            await emptyCartBydId(cart._id)

        dispatch({ type: 'emptyCart' })
    }, [cart._id, _id])

    const changeItemCount = useCallback(async (itemId, newCount) => {
        if (_id)
            await addToCartBydId(cart._id, { item: itemId, count: newCount })

        dispatch({ type: 'changeItemCount', itemId, newCount })
    }, [cart._id, _id])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart, changeItemCount, cartDropDownRef }}>
            {children}
        </CartContext.Provider>
    )
}