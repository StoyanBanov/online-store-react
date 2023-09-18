import { useCallback, useContext, useEffect, useState } from "react"
import { addUserPurchase, getUserData } from "../../data/services/userService"
import { CartContext } from "../common/context/CartContext"
import { PurchaseOffice } from "./PurchaseOffice"

import style from './style.module.css'
import { PurchaseAddress } from "./PurchaseAddress"

export const CreatePurchase = () => {
    const { cart: { items }, emptyCart } = useContext(CartContext)

    const [values, setValues] = useState({
        fname: '',
        lname: '',
        paymentMethod: 'cash',
        deliverTo: 'address',
        address: {
            'street': '',
            'city': '',
            'zipCode': '',
            'county': '',
            'country': ''
        },
        city: '',
        office: '',
        phone: '',
    })

    const [userData, setUserData] = useState({})

    useEffect(() => {
        getUserData()
            .then(setUserData)
    }, [])

    useEffect(() => {
        setValues(state => ({ ...state, phone: userData.phone || '', fname: userData.fname || '', lname: userData.lname || '' }))
    }, [userData])

    const changeValueHandler = useCallback((e, name, val) => {
        const key = e?.target.name || name
        const value = e?.target.value || e?.target.textContent || val
        setValues(state => ({ ...state, [key]: value }))
    }, [])

    const changeAddressValueHandler = useCallback(e => {
        setValues(state => ({ ...state, address: { ...state.address, [e.target.name]: e.target.value } }))
    }, [])

    const savedAddressChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, address: userData[e.target.name] }))
    }, [userData])

    const submitHandler = async e => {
        e.preventDefault()

        await addUserPurchase({
            fname: values.fname,
            lname: values.lname,
            paymentMethod: values.paymentMethod,
            deliverTo: values.deliverTo,
            phone: values.phone,
            address:
                values.address
                    ? Object.entries(values.address).map(([k, v]) => `${k}: ${v}`).join(', ')
                    : `City: ${values.city}, Office: ${values.office}`,
            items
        })

        await emptyCart()
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="inputFName">First name:</label>
                    <input id="inputFName" name="fname" value={values.fname} onChange={changeValueHandler} />
                </div>

                <div>
                    <label htmlFor="inputLName">Last name:</label>
                    <input id="inputLName" name="lname" value={values.lname} onChange={changeValueHandler} />
                </div>

                <div>
                    <label htmlFor="inputPhone">Phone:</label>
                    <input id="inputPhone" name="phone" value={values.phone} onChange={changeValueHandler} />
                </div>

                <div>
                    <label>Payment method:</label>

                    <input type="radio" name="paymentMethod" value={'cash'} onChange={changeValueHandler} checked={values.paymentMethod === 'cash'} />
                    <label>cash</label>

                    <input type="radio" name="paymentMethod" value={'card'} onChange={changeValueHandler} checked={values.paymentMethod === 'card'} disabled />
                    <label>card</label>
                </div>

                <div>
                    <label>Deliver to:</label>

                    <input type="radio" name="deliverTo" value={'office'} onChange={changeValueHandler} checked={values.deliverTo === 'office'} />
                    <label>office</label>

                    <input type="radio" name="deliverTo" value={'address'} onChange={changeValueHandler} checked={values.deliverTo === 'address'} />
                    <label>address</label>

                    {
                        values.deliverTo === 'office' &&
                        <PurchaseOffice changeValueHandler={changeValueHandler} city={values.city} office={values.office} />
                    }

                    {
                        values.deliverTo === 'address' &&
                        <PurchaseAddress
                            changeValueHandler={changeValueHandler}
                            changeAddressValueHandler={changeAddressValueHandler}
                            savedAddressChangeHandler={savedAddressChangeHandler}
                            userData={userData}
                            address={values.address}
                        />
                    }
                </div>

                <button>Finalize purchase</button>
            </form>
        </div>
    )
}