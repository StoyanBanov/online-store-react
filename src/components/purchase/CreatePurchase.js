import { useCallback, useState } from "react"
import { getCities, getOffices } from "../../data/services/econtService"

import style from './style.module.css'

export const CreatePurchase = () => {
    const [values, setValues] = useState({
        paymentMethod: 'cash',
        deliverTo: 'address',
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
            if (!offices.length) {
                getOffices(cityId)
                    .then(data => {
                        setOffices(data.offices)
                    })
            }
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
                </div>

                <button>Finalize purchase</button>
            </form>
        </div>
    )
}