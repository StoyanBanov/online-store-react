import { createItem } from '../../../data/services/itemService'
import { ItemForm } from './ItemForm'

export const CreateItem = () => {

    const values = {
        title: '',
        description: '',
        discount: 0,
        price: 0.1,
        count: 0,
        thumbnail: null,
        images: [],
        imagesToRemove: []
    }

    return (
        <ItemForm defValues={values} submitCallback={createItem} title={'Create'} />
    )
}