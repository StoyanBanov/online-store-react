import { useCallback, useEffect, useRef, useState } from "react"
import { getAllParentCategories } from "../../../data/services/itemService"

import style from '../style.module.css'
import { ItemField } from "./ItemField"

export const CategoryForm = ({ defValues, submitCallback, existingCat, title }) => {

    const [values, setValues] = useState(null)

    const [categories, setCategories] = useState([])

    const [fields, setFields] = useState({})

    const [fieldKeys, setFieldKeys] = useState([])

    const fieldsCount = useRef(0)

    const changeField = useCallback((name, values) => {
        setFields(state => ({ ...state, [name]: values }))
    }, [])

    const addFieldClickHandler = useCallback(() => {
        setFieldKeys(state => [...state, ++fieldsCount.current])
    }, [])

    const removeFieldClickHandler = useCallback((index, name) => {
        setFields(state => {
            const current = { ...state }
            delete current[name]
            return current
        })

        setFieldKeys(state => state.filter((_, i) => i !== index))
    }, [])

    useEffect(() => {
        if (existingCat?.itemFields) {
            let fieldsObj = {}
            let currentFieldKeys = []
            for (const [k, v] of Object.entries(existingCat.itemFields)) {
                fieldsObj[`field${++fieldsCount.current}`] = { name: k, type: v }
                currentFieldKeys.push(fieldsCount.current)
            }
            setFields(fieldsObj)
            setFieldKeys(currentFieldKeys)
        }
    }, [existingCat])

    useEffect(() => {
        setValues(defValues)
    }, [defValues])

    useEffect(() => {
        getAllParentCategories()
            .then(cats => setCategories(cats.filter(c => c._id !== existingCat?._id)))
    }, [existingCat])

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const onImageHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.files[0] }))
    }, [])

    const onSubmitHandler = e => {
        e.preventDefault()

        const formData = new FormData()

        Object.entries(values).forEach(([k, v]) => {
            if (v) {
                formData.append(k, v)
            }
        })

        for (const { name, type } of Object.values(fields)) {
            formData.append(name, type)
        }

        submitCallback(formData)
    }

    return (
        values &&
        <div className={style.formContainer}>
            <h1>{title} Form</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="cat-title">Title</label>
                    <input id="cat-title" name="title" value={values.title} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="item-thumbnail">Thumbnail</label>
                    {
                        existingCat &&
                        <img src={`http://localhost:3030/static/images/${existingCat.thumbnail}`} alt={existingCat.title} />
                    }
                    <input type="file" id="item-thumbnail" name="thumbnail" onChange={onImageHandler} />
                </div>

                <div>
                    <label htmlFor="item-category">Category</label>
                    <select id="item-category" name="parentCategory" onChange={onValueChangeHandler}>
                        <option value={''}>none</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                </div>

                {
                    <>
                        {
                            fieldKeys?.map((a, i) =>
                                <ItemField
                                    key={a}
                                    defValues={fields[`field${a}`]}
                                    removeFieldClickHandler={removeFieldClickHandler.bind(null, i, `field${a}`)}
                                    changeField={changeField.bind(null, `field${a}`)}
                                />
                            )
                        }

                        <div>
                            <svg onClick={addFieldClickHandler} width={22} height={22} stroke="black" strokeWidth={1}>
                                <line x1={11} y1={2} x2={11} y2={20} />
                                <line x1={2} y1={11} x2={20} y2={11} />
                            </svg>
                        </div>
                    </>
                }

                <button type="submit">{title}</button>
            </form>
        </div>
    )
}