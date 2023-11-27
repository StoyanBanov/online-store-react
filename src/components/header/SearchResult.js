import { Link } from "react-router-dom"
import { IMAGES_DIR } from "../../constants"

export const SearchResult = ({ item, searchValue }) => {

    const searchValueIndex = item.title.toLowerCase().indexOf(searchValue.toLowerCase())

    return (
        <li>
            <Link to={`/catalog/${item._id}`}>
                <div>
                    <img src={`${IMAGES_DIR}/${item.thumbnail}`} alt={item.thumbnail} />

                    <div>
                        {item.title.slice(0, searchValueIndex)}

                        <b>{item.title.slice(searchValueIndex, searchValueIndex + searchValue.length)}</b>

                        {item.title.slice(searchValueIndex + searchValue.length)}
                    </div>
                </div>
            </Link>
        </li>
    )
}