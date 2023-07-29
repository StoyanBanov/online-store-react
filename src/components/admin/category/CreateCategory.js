import { CategoryForm } from "./CategoryForm"
import { createCategory } from "../../../data/services/itemService"

export const CreateCategory = () => {
    const values = {
        title: '',
        parentCategory: ''
    }

    return (
        <CategoryForm defValues={values} submitCallback={createCategory} title={'Create'} />
    )
}