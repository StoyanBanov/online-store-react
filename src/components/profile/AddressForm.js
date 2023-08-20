import { useCallback, useEffect, useState } from "react"

export const AddressForm = ({ address }) => {

    const [values, setValues] = useState({

    })

    useEffect(() => {
        if (address) {
            setValues({ ...address })
        }
    }, [address])

    const submitHandler = useCallback(() => {

    }, [address])

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="inputStreet">Street</label>
                <input id="inputStreet" value={values.street || ''} />
            </div>

            <div>
                <label htmlFor="inputStreet">City</label>
                <input id="inputStreet" value={values.city || ''} />
            </div>

            <div>
                <label htmlFor="inputStreet">ZIP Code</label>
                <input id="inputStreet" value={values.zipCode || ''} />
            </div>

            <div>
                <label htmlFor="inputStreet">Country</label>
                <input id="inputStreet" value={values.country || ''} />
            </div>

            <button>{address ? 'Update' : 'Add'}</button>
        </form>
    )
}