import { useCallback, useState } from "react"
import { createCategory } from "../../data/services/itemService"

export const CreateCategory = () => {
    const [values, setValues] = useState({
        title: "",
        parentCategory: 'none'
    })

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const onSubmitHandler = useCallback(async e => {
        e.preventDefault()
        await createCategory(values.parentCategory === 'none' ? { ...values, parentCategory: undefined } : values)
    }, [values])

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="cat-title">Title</label>
                    <input id="cat-title" name="title" value={values.title} onChange={onValueChangeHandler} />
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