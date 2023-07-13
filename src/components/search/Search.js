import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

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
        <div>
            <form onSubmit={submitHandler}>
                <input value={searchValue} onChange={searchValueChangeHandler} />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}