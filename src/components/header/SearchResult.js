import { Link } from "react-router-dom"
import { IMAGES_DIR } from "../../constants"

export const SearchResult = ({ item, searchValue }) => {

    const searchValueIndex = item.title.toLowerCase().indexOf(searchValue.toLowerCase())

    const title = item.title.length > 100
        ? item.title.substring(searchValueIndex)
        : item.title

    return (
        <li>
            <Link to={`/catalog/${item._id}`}>
                <div>
                    <img src={`${IMAGES_DIR}/${item.thumbnail}`} alt={item.thumbnail} />

                    <div>
                        {title.slice(0, searchValueIndex)}

                        <b>{title.slice(searchValueIndex, searchValueIndex + searchValue.length)}</b>

                        {title.slice(searchValueIndex + searchValue.length)}
                    </div>
                </div>
            </Link>
        </li>
    )
}