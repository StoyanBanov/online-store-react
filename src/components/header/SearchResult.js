export const SearchResult = ({ item, searchValue }) => {

    const searchValueIndex = item.title.toLowerCase().indexOf(searchValue.toLowerCase())

    return (
        <li>
            {item.title.slice(0, searchValueIndex)}
            <b>{item.title.slice(searchValueIndex, searchValueIndex + searchValue.length)}</b>
            {item.title.slice(searchValueIndex + searchValue.length)}
        </li>
    )
}