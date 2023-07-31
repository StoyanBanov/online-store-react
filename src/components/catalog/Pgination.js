import { Link, useSearchParams } from "react-router-dom"

import style from './style.module.css'

export const Pagination = ({ count = 1, currentPage }) => {

    const [searchParams] = useSearchParams()

    const searchParamsStr = [...searchParams.entries()].filter(p => p[0] !== 'page').map(p => `&${p[0]}=${p[1]}`).join('')

    return (
        <div className={style.paginationContainer}>
            {currentPage > 1 &&
                <Link to={'?page=' + (currentPage - 1) + searchParamsStr}>{`<`}</Link>
            }
            {
                new Array(count).fill(-1).map((_, i) => <Link key={i} to={`?page=${i + 1}${searchParamsStr}`}>{currentPage === i + 1 ? <strong>{i + 1}</strong> : i + 1}</Link>)
            }
            {currentPage < count &&
                <Link to={'?page=' + (currentPage + 1) + searchParamsStr}>{`>`}</Link>
            }
        </div>
    )
}