import { useEffect, useState } from "react"
import { CloseSVG } from "../../common/svg/CloseSVG"

export const ItemField = ({ defValues, removeFieldHandler, changeField }) => {
    const [values, setValues] = useState({
        name: '',
        type: 'text'
    })
    useEffect(() => {
        if (defValues)
            setValues(defValues)
    }, [defValues])

    const changeValueHandler = e => {
        const key = e.target.tagName === 'INPUT' ? 'name' : 'type'

        setValues(state => ({ ...state, [key]: e.target.value }))

        changeField({ ...values, [key]: e.target.value })
    }

    return (
        <div>
            <input placeholder="name" value={values.name} onChange={changeValueHandler} />

            <select value={values.type} onChange={changeValueHandler}>
                <option>number</option>
                <option>text</option>
            </select>

            <CloseSVG clickHandler={removeFieldHandler} />
        </div>
    )
}