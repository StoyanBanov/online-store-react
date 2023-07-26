import { useCallback, useState } from "react"
import { createCategory } from "../../../data/services/itemService"

export const CreateCategory = () => {
    const [values, setValues] = useState({
        title: "",
        parentCategory: 'none'
    })

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const onImageHandler = useCallback(e => {
        setValues(state => ({ ...state, thumbnail: e.target.files[0] }))
    }, [])

    const onSubmitHandler = useCallback(async e => {
        e.preventDefault()
        const formData = new FormData()
        Object.entries(values.parentCategory === 'none' ? { title: values.title } : values).forEach(([k, v]) => {
            formData.append(k, v)
        })
        await createCategory(formData)
    }, [values])

    return (
        <div>
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

                <input type="submit" defaultValue={'Create'} />
            </form>
        </div>
    )
}