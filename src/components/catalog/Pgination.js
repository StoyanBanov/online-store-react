import { Link } from "react-router-dom"

import style from './style.module.css'

export const Pagination = ({ count, currentPage }) => {
    return (
        <div className={style.paginationContainer}>
            {currentPage > 1 &&
                <Link to={'?page=' + (currentPage - 1)}>{`<`}</Link>
            }
            {
                new Array(count).fill(-1).map((_, i) => <Link key={i} to={`?page=${i + 1}`}>{currentPage === i + 1 ? <strong>{i + 1}</strong> : i + 1}</Link>)
            }
            {currentPage < count &&
                <Link to={'?page=' + (currentPage + 1)}>{`>`}</Link>
            }
        </div>
    )
}