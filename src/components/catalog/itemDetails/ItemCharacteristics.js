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
                    Object.keys(item.category.itemFields).map((k, i) => <tr key={i}><td>{k}</td> <td>{item[k]}</td> </tr>)
                }
            </table>
        </p>
    )
}