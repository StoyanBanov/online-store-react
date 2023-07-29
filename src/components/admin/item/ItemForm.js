import { useCallback, useEffect, useState } from "react"
import { getAllChildCategories } from "../../../data/services/itemService"
import { useNavigate } from "react-router-dom"
import { ItemFormImage } from "./ItemFormImage"

export const ItemForm = ({ defValues, existingItem, title, submitCallback }) => {

    const navigate = useNavigate()

    const [values, setValues] = useState(null)

    const [categories, setCategories] = useState([])

    useEffect(() => {
        setValues(defValues)
    }, [defValues])

    useEffect(() => {
        getAllChildCategories()
            .then(cats => {
                setCategories(cats)
                setValues(state => ({ ...state, category: cats[0]?._id }))
            })
    }, [])

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const onImageHandler = useCallback(e => {
        if (e.target.name === 'thumbnail') {
            setValues(state => ({ ...state, [e.target.name]: e.target.files[0] }))
        } else {
            setValues(state => ({ ...state, [e.target.name]: e.target.files.length > 1 ? [...state[e.target.name], ...e.target.files] : [...state[e.target.name], e.target.files[0]] }))
        }
    }, [])

    const imageHandler = useCallback((image, isRemoving) => {
        let key = typeof image === 'string' ? 'imageNamesToRemove' : 'imagesToRemove'
        if (isRemoving)
            setValues(state => ({ ...state, [key]: [...state[key], image] }))
        else
            setValues(state => ({ ...state, [key]: state[key].filter(i => i !== image) }))
    }, [])

    const onSubmitHandler = async e => {
        e.preventDefault()

        const formData = new FormData()
        Object.entries({ ...values, images: values.images?.filter(i => !values.imagesToRemove.includes(i)), imagesToRemove: [] }).forEach(([k, v]) => {
            if (v) {
                if (Array.isArray(v)) {
                    for (const subV of v) {
                        formData.append(k, subV)
                    }
                } else formData.append(k, v)
            }
        });

        submitCallback(formData)

        navigate('/')
    }

    return (
        values &&
        <div>
            <h1>{title} Form</h1>
            <form onSubmit={onSubmitHandler} encType="multipart/form-data">
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
                    <textarea id="item-description" name="description" value={values.description} onChange={onValueChangeHandler} rows={5} />
                </div>

                <div>
                    <label htmlFor="item-count">Count</label>
                    <input type="number" min={0} id="item-count" name="count" value={values.count} onChange={onValueChangeHandler} rows={5} />
                </div>

                <div>
                    <label htmlFor="item-thumbnail">Thumbnail</label>
                    {
                        existingItem &&
                        <ItemFormImage image={existingItem.thumbnail} imageHandler={imageHandler} isRemovable={false} />
                    }
                    <input type="file" id="item-thumbnail" name="thumbnail" onChange={onImageHandler} />
                </div>

                <div>
                    <label htmlFor="item-images">Images</label>
                    {
                        existingItem &&
                        existingItem.images.concat(...values.images).map((img, i) =>
                            <ItemFormImage
                                key={i}
                                image={img}
                                imageHandler={imageHandler}
                            />
                        )
                    }
                    <input type="file" id="item-images" name="images" onChange={onImageHandler} multiple />
                </div>

                <div>
                    <label htmlFor="item-category">Category</label>
                    <select id="item-category" name="category" onChange={onValueChangeHandler} value={values.category}>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                </div>

                <button type="submit">{title}</button>
            </form>
        </div>
    )
}