import * as api from "../api"

const endpints = {

}

export async function createItem(itemData) {
    return api.post('/item', itemData)
}