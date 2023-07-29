import { useEffect, useState } from "react"
import { ItemForm } from "./ItemForm"
import { editItemById, getItemById } from "../../../data/services/itemService"
import { useParams } from "react-router-dom"

export const EditItem = () => {
    const { itemId } = useParams()

    const [existingItem, setExistingItem] = useState(null)

    const [values, setValues] = useState(null)

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
                                imagesToRemove: [],
                                imageNamesToRemove: []
                            }
                        )
                    }
                )
    }, [itemId])

    return (
        values &&
        <ItemForm defValues={values} existingItem={existingItem} submitCallback={editItemById.bind(null, itemId)} title={'Edit'} />
    )
}