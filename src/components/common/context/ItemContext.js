import { createContext, useEffect, useState } from "react"

export const ItemContext = ({ children }) => {
    const ItemContext = createContext()

    const [categories, setCategories] = useState([])

    useEffect(() => {

    }, [])

    return (
        <ItemContext.Provider categories={categories}>
            {children}
        </ItemContext.Provider>
    )
}