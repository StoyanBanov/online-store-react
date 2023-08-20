import { createContext, useEffect, useState } from "react";

export const DimensionsContext = createContext()

export const DimensionsContextProvider = ({ children }) => {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    function scrollHandler() {
        setScrollY(this.scrollY)
    }

    return (
        <DimensionsContext.Provider value={{ scrollY }}>
            {children}
        </DimensionsContext.Provider >
    )
}