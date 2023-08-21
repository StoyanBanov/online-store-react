import { useCallback, useContext, useState } from "react"
import { getCities, getOffices } from "../../data/services/econtService"

import style from './style.module.css'
import { addUserPurchase } from "../../data/services/userService"
import { CartContext } from "../common/context/CartContext"

export const CreatePurchase = () => {
    const { cart: { items }, emptyCart } = useContext(CartContext)

    const [values, setValues] = useState({
        paymentMethod: 'cash',
        deliverTo: 'address',
        address: '',
        city: '',
        office: ''
    })

    const [cities, setCities] = useState([])

    const [showCities, setShowCities] = useState(false)

    const [cityId, setCityId] = useState('')

    const [offices, setOffices] = useState([])

    const [showOffices, setShowOffices] = useState(false)

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
        console.log(values);
        setValues(state => ({ ...state, address: { ...state.address, [e.target.name]: e.target.value } }))
    }, [])

    const submitHandler = async e => {
        e.preventDefault()

        await addUserPurchase({
            paymentMethod: values.paymentMethod,
            deliverTo: values.deliverTo,
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
                            <div>
                                <label htmlFor="inputStreet">Street</label>
                                <input id="inputStreet" name="street" value={values.street} onChange={valueAddressChangeHandler} />
                            </div>

                            <div>
                                <label htmlFor="inputStreet">City</label>
                                <input id="inputStreet" name="city" value={values.city} onChange={valueAddressChangeHandler} />
                            </div>

                            <div>
                                <label htmlFor="inputStreet">ZIP Code</label>
                                <input id="inputStreet" name="zipCode" value={values.zipCode} onChange={valueAddressChangeHandler} />
                            </div>

                            <div>
                                <label htmlFor="inputStreet">County</label>
                                <input id="inputStreet" name="county" value={values.county} onChange={valueAddressChangeHandler} />
                            </div>

                            <div>
                                <label htmlFor="inputStreet">Country</label>
                                <input id="inputStreet" name="country" value={values.country} onChange={valueAddressChangeHandler} />
                            </div>
                        </>
                    }
                </div>

                <button>Finalize purchase</button>
            </form>
        </div>
    )
}