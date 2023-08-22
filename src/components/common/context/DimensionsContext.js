import { createContext, useCallback, useEffect, useState } from "react";

export const DimensionsContext = createContext()

export const DimensionsContextProvider = ({ children }) => {
    const [dimensions, setDimensions] = useState({
        scrollY: 0,
        windowWidth: 0
    })

    const scrollHandler = useCallback(function () {
        setDimensions(state => ({ ...state, scrollY: this.scrollY }))
    }, [])

    const widthHandler = useCallback(function () {
        setDimensions(state => ({ ...state, windowWidth: this.innerWidth }))
    }, [])


    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        window.addEventListener('resize', widthHandler)

        return () => {
            window.removeEventListener('scroll', scrollHandler)
            window.removeEventListener('resize', widthHandler)
        }
    }, [scrollHandler, widthHandler])

    return (
        <DimensionsContext.Provider value={dimensions}>
            {children}
        </DimensionsContext.Provider >
    )
}