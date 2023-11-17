import { Link } from "react-router-dom"

export const SearchResult = ({ item, searchValue }) => {

    const searchValueIndex = item.title.toLowerCase().indexOf(searchValue.toLowerCase())

    return (
        <li>
            <Link to={`/catalog/${item._id}`}>
                {item.title.slice(0, searchValueIndex)}
                <b>{item.title.slice(searchValueIndex, searchValueIndex + searchValue.length)}</b>
                {item.title.slice(searchValueIndex + searchValue.length)}
            </Link>
        </li>
    )
}