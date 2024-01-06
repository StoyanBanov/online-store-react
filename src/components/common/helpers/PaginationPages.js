import { makePages } from "../../../util"

export const PaginationPages = ({ currentPage, totalPages, pageWrap: PageWrap }) => {
    return (
        makePages(currentPage, totalPages)
            .map((p, i) => !isNaN(p)
                ? PageWrap
                    ? <PageWrap key={`${p}${i}`} page={p}>{currentPage === p ? <b>{p}</b> : p}</PageWrap>
                    : <span key={`${p}${i}`} page={p}>{currentPage === p ? <b>{p}</b> : p}</span>
                : <span key={`${p}${i}`} >{p}</span>
            )
    )
}