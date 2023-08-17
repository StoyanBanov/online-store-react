import { useEffect, useState } from "react"

export const ItemField = ({ defValues, removeFieldClickHandler, changeField }) => {
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
                <option>numeric</option>
                <option>text</option>
            </select>

            <svg onClick={removeFieldClickHandler} width={22} height={22} stroke="black" strokeWidth={1}>
                <line x1={2} y1={2} x2={20} y2={20} />
                <line x1={2} y1={20} x2={20} y2={2} />
            </svg>
        </div>
    )
}