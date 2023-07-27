import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createCategory, editCategoryById, getCategoryById } from "../../../data/services/itemService"

export const CategoryForm = () => {
    const { catId } = useParams()

    const [values, setValues] = useState({
        title: '',
        parentCategory: 'none'
    })

    useEffect(() => {
        if (catId)
            getCategoryById(catId)
                .then(cat => setValues({ title: cat.title, parentCategory: cat.parentCategory || 'none', thumbnail: cat.thumbnail }))
    }, [catId])

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const onImageHandler = useCallback(e => {
        setValues(state => ({ ...state, thumbnail: e.target.files[0] }))
    }, [])

    const onSubmitHandler = useCallback(async e => {
        e.preventDefault()

        const formData = new FormData()

        Object.entries(values).forEach(([k, v]) => {
            if (v) {
                if (k === 'parentCategory' && v === 'none') return
                formData.append(k, v)
            }
        })

        if (catId)
            await editCategoryById(catId, formData)
        else
            await createCategory(formData)
    }, [values, catId])

    return (
        <div>
            <h1>{catId ? 'Edit' : 'Create'} Form</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="cat-title">Title</label>
                    <input id="cat-title" name="title" value={values.title} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="item-thumbnail">Thumbnail</label>
                    <input type="file" id="item-thumbnail" name="thumbnail" onChange={onImageHandler} />
                </div>

                <div>
                    <label htmlFor="item-category">Category</label>
                    <select id="item-category" name="parentCategory" onChange={onValueChangeHandler}>
                        <option>none</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>

                <button type="submit">{catId ? 'Edit' : 'Create'}</button>
            </form>
        </div>
    )
}