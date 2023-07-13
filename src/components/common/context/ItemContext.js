import { createContext, useEffect, useState } from "react"

export const ItemContext = createContext()

export const ItemContextProvider = ({ children }) => {

    const [items, setItems] = useState([])

    useEffect(() => {

    }, [])

    return (
        <ItemContext.Provider value={
            items
        }>
            {children}
        </ItemContext.Provider>
    )
}