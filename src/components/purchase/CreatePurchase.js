import { useCallback, useContext, useEffect, useState } from "react"
import { CartContext } from "../common/context/CartContext"
import { getCities } from "../../data/services/econtService"

export const CreatePurchase = () => {
    const { cart } = useContext(CartContext)

    const [values, setValues] = useState({
        paymentMethod: 'cash',
        deliverTo: 'address',
        city: ''
    })

    const [cities, setCities] = useState([])

    const [showCities, setShowCities] = useState([])

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
        } else setShowCities(false)
    }

    const submitHandler = () => {

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
                        <div>
                            <label>City</label>
                            <input name="city" value={values.city} onChange={changeValueHandler} onFocus={showCitiesHandler} onBlur={showCitiesHandler} />

                            {showCities &&
                                <ul>
                                    {
                                        cities.filter(c => c.nameEn.toLowerCase().startsWith(values.city.toLowerCase())).map(c => <li key={c.id} id={c.id}>{c.nameEn}</li>)
                                    }
                                </ul>
                            }
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}