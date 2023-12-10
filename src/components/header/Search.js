import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import style from './style.module.css'
import { DimensionsContext } from "../common/context/DimensionsContext"
import { MOBILE_MAX_WIDTH } from "../../constants"
import { getItems } from "../../data/services/itemService"
import { SearchResult } from "./SearchResult"

export const Search = ({ autoFocus = false, closeHandler }) => {
    const [searchValue, setSearchValue] = useState('')

    const [searchResults, setSearchResults] = useState({ list: [], highlighted: -1 })

    const navigate = useNavigate()

    const { windowWidth } = useContext(DimensionsContext)

    const [width, setWidth] = useState(0)

    useEffect(() => {
        let total = 0

        let step = 10

        const interval = setInterval(() => {
            setWidth(total += step)

            if (step < 50)
                step += 10

            if (total === (windowWidth > MOBILE_MAX_WIDTH ? 300 : 250)) {
                clearInterval(interval)
            }
        }, 20)
    }, [windowWidth])

    useEffect(() => {

    }, [])

    const typeHandler = useCallback(() => {
        searchValue.length
            ? getItems({ search: searchValue, itemsPerPage: 5 })
                .then(data => setSearchResults(state => ({ ...state, list: data })))
            : setSearchResults({ list: [], highlighted: -1 })
    }, [searchValue])

    useEffect(typeHandler, [typeHandler])

    const searchValueChangeHandler = useCallback(e => {
        setSearchResults(state => ({ list: state.list, highlighted: -1 }))
        setSearchValue(e.target.value)
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        if (searchValue) {
            navigate(`/catalog${searchResults.highlighted >= 0 ? `/${searchResults.list[searchResults.highlighted]._id}` : `?search=${searchValue}`}`)
            if (closeHandler) {
                closeHandler()
            }
        }
    }

    const blurHandler = useCallback(() => {
        let step = 10

        let total = width
        const interval = setInterval(() => {
            setWidth((total -= step))

            if (step < 50)
                step += 10

            if (total <= 0) {
                clearInterval(interval)
                closeHandler()
            }
        }, 20)

    }, [closeHandler, width])

    const keyDownHandler = useCallback(e => {
        if (e.key === 'ArrowDown') {
            setSearchResults(state => ({ list: [...state.list], highlighted: state.highlighted < state.list.length - 1 ? state.highlighted + 1 : 0 }))
        } else if (e.key === 'ArrowUp') {
            setSearchResults(state => ({ list: [...state.list], highlighted: state.highlighted > 0 ? state.highlighted - 1 : state.list.length - 1 }))
        }
    }, [])

    const focusSearchHandler = useCallback(() => {
        setSearchResults({ list: [], highlighted: -1 })
        typeHandler()
        window.addEventListener('keydown', keyDownHandler)
    }, [typeHandler, keyDownHandler])

    const blurSearchHandler = useCallback(() => {
        setTimeout(() => {
            window.removeEventListener('keydown', keyDownHandler)
            setSearchResults({ list: [], highlighted: -1 })
        }, 300)
    }, [keyDownHandler])

    return (
        <div className={style.searchBar}>
            <form onSubmit={submitHandler} onBlur={closeHandler && blurHandler}>
                <input
                    style={{ width }}
                    value={searchValue}
                    onChange={searchValueChangeHandler}
                    onBlur={blurSearchHandler}
                    onFocus={focusSearchHandler}
                    autoFocus={autoFocus}
                />

                <svg onClick={submitHandler} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

                <ul className={style.searchBarResultsContainer}>
                    {
                        searchResults.list.map((r, i) => <SearchResult key={r._id} item={r} searchValue={searchValue} highlighted={searchResults.highlighted === i} />)
                    }
                </ul>
            </form>
        </div>
    )
}