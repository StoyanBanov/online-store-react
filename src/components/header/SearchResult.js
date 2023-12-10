import { Link } from "react-router-dom"
import { IMAGES_DIR } from "../../constants"

import style from "./style.module.css"

export const SearchResult = ({ item, searchValue, highlighted }) => {

    const searchValueIndex = item.title.toLowerCase().indexOf(searchValue.toLowerCase())

    const title = item.title.length > 100
        ? item.title.substring(searchValueIndex)
        : item.title

    return (
        <li className={highlighted ? style.liHighlighted : ''}>
            <Link to={`/catalog/${item._id}`}>
                <div>
                    <img src={`${IMAGES_DIR}/${item.thumbnail}`} alt={item.thumbnail} />

                    <p style={{ textOverflow: 'clip' }}>
                        {title.slice(0, searchValueIndex)}

                        <b>{title.slice(searchValueIndex, searchValueIndex + searchValue.length)}</b>

                        {title.slice(searchValueIndex + searchValue.length)}
                    </p>

                    <span><b>{item.price.toFixed(2)}$</b></span>
                </div>
            </Link>
        </li>
    )
}