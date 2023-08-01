import { useCallback, useEffect, useState } from "react"
import { getAllParentCategories } from "../../../data/services/itemService"

export const CategoryForm = ({ defValues, submitCallback, existingCat, title }) => {

    const [values, setValues] = useState(null)

    const [categories, setCategories] = useState([])

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

    const onSubmitHandler = useCallback(async e => {
        e.preventDefault()

        const formData = new FormData()

        Object.entries(values).forEach(([k, v]) => {
            if (v) {
                formData.append(k, v)
            }
        })

        submitCallback(formData)
    }, [values, submitCallback])

    return (
        values &&
        <div>
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
                        <option value={'all'}>none</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                </div>

                <button type="submit">{title}</button>
            </form>
        </div>
    )
}