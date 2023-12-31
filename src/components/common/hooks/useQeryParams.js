import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [searchParamsObj, setSearchParamsObject] = useState({})

    useEffect(() => {
        setSearchParamsObject(Object.fromEntries(searchParams.entries()))
    }, [searchParams])

    return { searchParams, searchParamsObj, setSearchParams }
}