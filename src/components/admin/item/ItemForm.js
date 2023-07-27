import { useCallback, useEffect, useState } from "react"
import { createItem, editItemById, getAllChildCategories, getItemById } from "../../../data/services/itemService"
import { useNavigate, useParams } from "react-router-dom"

export const ItemForm = () => {
    const { itemId } = useParams()

    const [existingItem, setExistingItem] = useState(null)

    const navigate = useNavigate()

    const [values, setValues] = useState({
        title: '',
        price: '',
        description: '',
        category: ''
    })

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllChildCategories()
            .then(cats => {
                setCategories(cats)
                setValues(state => ({ ...state, category: cats[0]?._id }))
            })
    }, [])

    useEffect(() => {
        if (itemId)
            getItemById(itemId)
                .then(
                    item => {
                        setExistingItem(item)
                        setValues(
                            {
                                ...item,
                                thumbnail: null,
                                images: [],
                                imagesToRemove: []
                            }
                        )
                    }
                )
    }, [itemId])

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const onImageHandler = useCallback(e => {
        if (e.target.name === 'thumbnail') {
            setValues(state => ({ ...state, thumbnail: e.target.files[0] }))
        } else {
            setValues(state => ({ ...state, images: [...e.target.files] }))
        }
    }, [])

    const onSubmitHandler = async e => {
        e.preventDefault()
        const formData = new FormData()
        Object.entries(values).forEach(([k, v]) => {
            if (v) {
                if (Array.isArray(v)) {
                    for (const subV of v) {
                        formData.append(k, subV)
                    }
                } else formData.append(k, v)
            }
        });

        if (itemId)
            await editItemById(itemId, formData)
        else
            await createItem(formData)

        navigate('/')
    }

    return (
        <div>
            <h1>{itemId ? 'Edit' : 'Create'} Form</h1>
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
                    <label htmlFor="item-thumbnail">Thumbnail</label>
                    <input type="file" id="item-thumbnail" name="thumbnail" onChange={onImageHandler} />
                </div>

                <div>
                    <label htmlFor="item-images">Images</label>
                    <input type="file" id="item-images" name="images" onChange={onImageHandler} multiple />
                </div>

                <div>
                    <label htmlFor="item-category">Category</label>
                    <select id="item-category" name="category" onChange={onValueChangeHandler} value={values.category}>
                        {categories.map((c, i) => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                </div>

                <button type="submit">{itemId ? 'Edit' : 'Create'}</button>
            </form>
        </div>
    )
}