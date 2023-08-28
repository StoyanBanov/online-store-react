import { Link, useSearchParams } from "react-router-dom"

import style from './style.module.css'
import { PaginationPages } from "../common/helpers/PaginationPages"

export const Pagination = ({ count = 1, currentPage }) => {

    const [searchParams] = useSearchParams()

    const searchParamsStr = [...searchParams?.entries()].filter(p => p[0] !== 'page').map(p => `&${p[0]}=${p[1]}`).join('')

    const PageWrapper = ({ children, page }) => {
        return (
            <Link to={`?page=${page}${searchParamsStr}`}>{children}</Link>
        )
    }

    return (
        <div className={style.paginationContainer}>
            {currentPage > 1 &&
                <Link to={'?page=' + (currentPage - 1) + searchParamsStr}>{`<`}</Link>
            }
            {
                <PaginationPages currentPage={currentPage} totalPages={count} pageWrap={PageWrapper} />
            }
            {currentPage < count &&
                <Link to={'?page=' + (currentPage + 1) + searchParamsStr}>{`>`}</Link>
            }
        </div>
    )
}