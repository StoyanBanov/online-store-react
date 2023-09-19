import { useCallback, useState } from 'react'

import { getCities, getOffices } from "../../data/services/econtService"

import style from './style.module.css'

export const PurchaseOffice = ({ changeValueHandler, city, office }) => {
    const [cities, setCities] = useState([])

    const [showCities, setShowCities] = useState(false)

    const [cityId, setCityId] = useState('')

    const [offices, setOffices] = useState([])

    const [showOffices, setShowOffices] = useState(false)

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
        changeValueHandler(e, 'city')
        setCityId(e.target.id)
        setShowCities(false)
    }, [changeValueHandler])

    const chooseOfficeHandler = useCallback(e => {
        changeValueHandler(e, 'office')
        setShowOffices(false)
    }, [changeValueHandler])

    return (
        <>
            <div className={style.purchaseDropDown}>
                <label>City</label>
                <input name="city" value={city} onChange={changeValueHandler} onFocus={showCitiesHandler} onBlur={showCitiesHandler} required />

                {showCities &&
                    <ul className={style.econtCities}>
                        {
                            cities
                                .filter(c => c.nameEn.toLowerCase().startsWith(city.toLowerCase()))
                                .map(c => <li key={c.id} id={c.id} onClick={chooseCityHandler}>{c.nameEn}</li>)
                        }
                    </ul>
                }
            </div>

            <div className={style.purchaseDropDown}>
                <label>Office</label>
                <input name="office" value={office} onChange={changeValueHandler} onFocus={showOfficesHandler} onBlur={showOfficesHandler} disabled={!cityId} required />

                {showOffices &&
                    <ul className={style.econtCities}>
                        {
                            offices
                                .filter(c => c.nameEn.toLowerCase().startsWith(office.toLowerCase()))
                                .map(c => <li key={c.id} id={c.id} onClick={chooseOfficeHandler}>{c.nameEn}</li>)
                        }
                    </ul>
                }
            </div>
        </>

    )
}