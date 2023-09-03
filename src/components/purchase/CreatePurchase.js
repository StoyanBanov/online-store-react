import { useCallback, useContext, useEffect, useState } from "react"
import { getCities, getOffices } from "../../data/services/econtService"

import style from './style.module.css'
import { addUserPurchase, getUserData } from "../../data/services/userService"
import { CartContext } from "../common/context/CartContext"

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

    const [cities, setCities] = useState([])

    const [showCities, setShowCities] = useState(false)

    const [cityId, setCityId] = useState('')

    const [offices, setOffices] = useState([])

    const [showOffices, setShowOffices] = useState(false)

    const [userData, setUserData] = useState({})

    useEffect(() => {
        getUserData()
            .then(setUserData)
    }, [])

    useEffect(() => {
        setValues(state => ({ ...state, phone: userData.phone || '', fname: userData.fname || '', lname: userData.lname || '' }))
    }, [userData])

    const changeValueHandler = useCallback(e => {
        const key = e.target.name
        const value = e.target.value
        setValues(state => ({ ...state, [key]: value }))
    }, [])

    const showCitiesHandler = e => {
        if (e.type === 'focus') {
            if (!cities.length) {
                getCities()
                    .then(data => setCities(data.cities))
            }
            setShowCities(true)
        }
    }

    const showOfficesHandler = e => {
        if (e.type === 'focus') {
            getOffices(cityId)
                .then(data => {
                    setOffices(data.offices)
                })

            setShowOffices(true)
        }
    }

    const chooseCityHandler = useCallback(e => {
        setValues(state => ({ ...state, city: e.target.textContent }))
        setCityId(e.target.id)
        setShowCities(false)
    }, [])

    const chooseOfficeHandler = useCallback(e => {
        setValues(state => ({ ...state, office: e.target.textContent }))
        setShowOffices(false)
    }, [])

    const valueAddressChangeHandler = useCallback(e => {
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
                        <>
                            <div className={style.purchaseDropDown}>
                                <label>City</label>
                                <input name="city" value={values.city} onChange={changeValueHandler} onFocus={showCitiesHandler} onBlur={showCitiesHandler} />

                                {showCities &&
                                    <ul className={style.econtCities}>
                                        {
                                            cities
                                                .filter(c => c.nameEn.toLowerCase().startsWith(values.city.toLowerCase()))
                                                .map(c => <li key={c.id} id={c.id} onClick={chooseCityHandler}>{c.nameEn}</li>)
                                        }
                                    </ul>
                                }
                            </div>

                            <div className={style.purchaseDropDown}>
                                <label>Office</label>
                                <input name="office" value={values.office} onChange={changeValueHandler} onFocus={showOfficesHandler} onBlur={showOfficesHandler} disabled={!cityId} />

                                {showOffices &&
                                    <ul className={style.econtCities}>
                                        {
                                            offices
                                                .filter(c => c.nameEn.toLowerCase().startsWith(values.office.toLowerCase()))
                                                .map(c => <li key={c.id} id={c.id} onClick={chooseOfficeHandler}>{c.nameEn}</li>)
                                        }
                                    </ul>
                                }
                            </div>
                        </>
                    }

                    {
                        values.deliverTo === 'address' &&
                        <>
                            {userData.address &&
                                <div>
                                    <label>Saved Addresses</label>
                                    <select name="address" onChange={savedAddressChangeHandler}>
                                        <option></option>
                                        <option>{userData.address.street}...</option>
                                        {userData.secondAddress &&
                                            <option name="secondAddress">{userData.secondAddress.street}...</option>
                                        }
                                    </select>
                                </div>
                            }

                            <div>
                                <label htmlFor="inputStreet">Street</label>
                                <input id="inputStreet" name="street" value={values.address.street} onChange={valueAddressChangeHandler} />
                            </div>

                            <div>
                                <label htmlFor="inputCity">City</label>
                                <input id="inputCity" name="city" value={values.address.city} onChange={valueAddressChangeHandler} />
                            </div>

                            <div>
                                <label htmlFor="inputZIPCode">ZIP Code</label>
                                <input id="inputZIPCode" name="zipCode" value={values.address.zipCode} onChange={valueAddressChangeHandler} />
                            </div>

                            <div>
                                <label htmlFor="inputCounty">County</label>
                                <input id="inputCounty" name="county" value={values.address.county} onChange={valueAddressChangeHandler} />
                            </div>

                            <div>
                                <label htmlFor="inputCountry">Country</label>
                                <input id="inputCountry" name="country" value={values.address.country} onChange={valueAddressChangeHandler} />
                            </div>
                        </>
                    }
                </div>

                <button>Finalize purchase</button>
            </form>
        </div>
    )
}