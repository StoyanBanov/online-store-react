export const ItemCharacteristicsRow = ({ item, fieldName }) => {
    return (
        <tr>
            <td>{fieldName}</td>
            <td>{item[fieldName]}</td>
        </tr>
    )
}