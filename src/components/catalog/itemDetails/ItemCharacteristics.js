import { ItemCharacteristicsRow } from "./ItemCharacteristicsRow"

import style from './style.module.css'

export const ItemCharacteristics = ({ item }) => {
    return (
        <table className={style.characteristicsTable} >
            <thead>
                <tr>
                    <th colSpan={2}>Characteristics</th>
                </tr>
                <tr>
                    <th>property</th>
                    <th>value</th>
                </tr>
            </thead>

            <tbody>
                {item.category.itemFields &&
                    Object.keys(item.category.itemFields).map((k) => <ItemCharacteristicsRow key={k} item={item} fieldName={k} />)
                }
            </tbody>
        </table>
    )
}