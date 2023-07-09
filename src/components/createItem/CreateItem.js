import { useCallback, useState } from "react"
import { createItem } from "../../data/services/itemService"

export const CreateItem = () => {

    const [values, setValues] = useState({
        title: "",
        price: "",
        description: "",
        category: 1
    })

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const onSubmitHandler = useCallback(async e => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        const item = await createItem(formData)
        console.log(item);
    }, [])

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="item-title">Title</label>
                    <input id="item-title" name="title" value={values.title} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="item-price">Price</label>
                    <input type="number" id="item-price" name="price" value={values.price} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="item-description">Description</label>
                    <input id="item-description" name="description" value={values.description} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="item-category">Category</label>
                    <select id="item-category" name="category" onChange={onValueChangeHandler} value={values.category}>
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