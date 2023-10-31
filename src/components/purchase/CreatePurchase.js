import { useCallback, useContext, useEffect, useState } from "react"
import { getUserData } from "../../data/services/userService"
import { CartContext } from "../common/context/CartContext"
import { PurchaseOffice } from "./PurchaseOffice"
import { PurchaseAddress } from "./PurchaseAddress"

import style from './style.module.css'
import { AuthContext } from "../common/context/AuthContext"
import { useOutletContext } from "react-router-dom"

export const CreatePurchase = () => {
    const { setPurchaseHandler } = useOutletContext()

    const { user: { _id } } = useContext(AuthContext)

    const { cart: { items } } = useContext(CartContext)

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
        info: ''
    })

    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (_id)
            getUserData()
                .then(setUserData)
    }, [_id])

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

        setPurchaseHandler({
            firstName: values.fname,
            lastName: values.lname,
            paymentMethod: values.paymentMethod,
            deliverTo: values.deliverTo,
            phone: values.phone,
            address:
                values.address
                    ? Object.entries(values.address).map(([k, v]) => `${k}: ${v}`).join(', ')
                    : `City: ${values.city}, Office: ${values.office}`,
            items,
            info: values.info
        })
    }

    return (
        <div>
            <h1 className={style.purchaseHeading}>Purchase</h1>
            <form className={style.purchaseForm} onSubmit={submitHandler}>
                <div className={style.purchaseFormRow}>
                    <label htmlFor="inputFName">First name</label>
                    <input id="inputFName" name="fname" value={values.fname} onChange={changeValueHandler} required />
                </div>

                <div className={style.purchaseFormRow}>
                    <label htmlFor="inputLName">Last name</label>
                    <input id="inputLName" name="lname" value={values.lname} onChange={changeValueHandler} required />
                </div>

                <div className={style.purchaseFormRow}>
                    <label htmlFor="inputPhone">Phone</label>
                    <input min={10} id="inputPhone" name="phone" value={values.phone} onChange={changeValueHandler} required />
                </div>

                <div>
                    <label>Payment method:</label>

                    <div>
                        <input type="radio" id="paymentMethodCash" name="paymentMethod" value={'cash'} onChange={changeValueHandler} checked={values.paymentMethod === 'cash'} />
                        <label htmlFor="paymentMethodCash">cash</label>
                    </div>

                    <div>
                        <input type="radio" id="paymentMethodCard" name="paymentMethod" value={'card'} onChange={changeValueHandler} checked={values.paymentMethod === 'card'} disabled />
                        <label htmlFor="paymentMethodCard">card</label>
                    </div>
                </div>

                <div>
                    <label>Deliver to:</label>

                    <div>
                        <input type="radio" id="deliverToOffice" name="deliverTo" value={'office'} onChange={changeValueHandler} checked={values.deliverTo === 'office'} />
                        <label htmlFor="deliverToOffice">office</label>
                    </div>

                    <div>
                        <input type="radio" id="deliverToAddress" name="deliverTo" value={'address'} onChange={changeValueHandler} checked={values.deliverTo === 'address'} />
                        <label htmlFor="deliverToAddress">address</label>
                    </div>
                </div>

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

                <div className={style.purchaseFormRow}>
                    <label htmlFor="inputInfo">Additional information: </label>
                    <select id="inputInfo" name="info" value={values.info} onChange={changeValueHandler} required />
                </div>

                <div className={style.purchaseButtonContainer}>
                    <button>Create purchase</button>
                </div>
            </form>
        </div>
    )
}