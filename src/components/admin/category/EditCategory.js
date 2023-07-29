import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { editCategoryById, getCategoryById } from "../../../data/services/itemService"
import { CategoryForm } from "./CategoryForm"

export const EditCategory = () => {
    const { catId } = useParams()

    const [existingCat, setExistingCat] = useState(null)

    const [values, setValues] = useState(null)

    useEffect(() => {
        if (catId) {
            getCategoryById(catId)
                .then(cat => {
                    setExistingCat(cat)
                    setValues(
                        {
                            title: cat.title,
                            parentCategory: cat.parentCategory,
                            thumbnail: null
                        }
                    )
                })
        }
    }, [catId])

    return (
        values &&
        <CategoryForm defValues={values} submitCallback={editCategoryById.bind(null, catId)} existingCat={existingCat} title={'Edit'} />
    )
}