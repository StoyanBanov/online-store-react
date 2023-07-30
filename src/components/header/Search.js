import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

import style from './style.module.css'

export const Search = () => {
    const [searchValue, setSearchValue] = useState('')

    const navigate = useNavigate()

    const searchValueChangeHandler = useCallback(e => {
        setSearchValue(e.target.value)
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        navigate('/catalog?search=' + searchValue)
    }

    return (
        <div className={style.searchBar}>
            <form onSubmit={submitHandler}>
                <input value={searchValue} onChange={searchValueChangeHandler} />
                <svg onClick={submitHandler} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </form>
        </div>
    )
}