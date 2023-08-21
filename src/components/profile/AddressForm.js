import { useCallback, useEffect, useState } from "react"
import { addUserAddress, editUserAddress } from "../../data/services/userService"

export const AddressForm = ({ address, changeUserData }) => {

    const [values, setValues] = useState({
        street: '',
        city: '',
        zipCode: '',
        county: '',
        country: ''
    })

    useEffect(() => {
        if (address) {
            setValues({ ...address })
        }
    }, [address])

    const valueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const submitHandler = useCallback(async e => {
        e.preventDefault()

        let newAddress
        if (address)
            newAddress = await editUserAddress(address._id, values)
        else
            newAddress = await addUserAddress(values)

        changeUserData(newAddress)

        setValues(state => Object.fromEntries(Object.entries(state).map(e => [e[0], ''])))

    }, [address, values, changeUserData])

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="inputStreet">Street</label>
                <input id="inputStreet" name="street" value={values.street} onChange={valueChangeHandler} />
            </div>

            <div>
                <label htmlFor="inputStreet">City</label>
                <input id="inputStreet" name="city" value={values.city} onChange={valueChangeHandler} />
            </div>

            <div>
                <label htmlFor="inputStreet">ZIP Code</label>
                <input id="inputStreet" name="zipCode" value={values.zipCode} onChange={valueChangeHandler} />
            </div>

            <div>
                <label htmlFor="inputStreet">County</label>
                <input id="inputStreet" name="county" value={values.county} onChange={valueChangeHandler} />
            </div>

            <div>
                <label htmlFor="inputStreet">Country</label>
                <input id="inputStreet" name="country" value={values.country} onChange={valueChangeHandler} />
            </div>

            <button>{address ? 'Update' : 'Add'}</button>
        </form>
    )
}