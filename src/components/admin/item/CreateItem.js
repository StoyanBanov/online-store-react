import { createItem } from '../../../data/services/itemService'
import { ItemForm } from './ItemForm'

export const CreateItem = () => {

    const values = {
        title: '',
        description: '',
        discount: '',
        price: 0,
        count: 0,
        thumbnail: null,
        images: [],
        imagesToRemove: []
    }

    return (
        <ItemForm defValues={values} submitCallback={createItem} title={'Create'} />
    )
}