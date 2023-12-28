import { ItemCharacteristicsRow } from "./ItemCharacteristicsRow"

export const ItemCharacteristics = ({ item }) => {
    return (
        <p>
            <table style={{ border: '1px solid black' }}>
                <tr>
                    <th colSpan={2}>Characteristics</th>
                </tr>

                <tr>
                    <th>property</th>
                    <th>value</th>
                </tr>

                {item.category.itemFields &&
                    Object.keys(item.category.itemFields).map((k) => <ItemCharacteristicsRow key={k} item={item} fieldName={k} />)
                }
            </table>
        </p>
    )
}