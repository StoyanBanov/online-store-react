import { createContext, useCallback, useEffect, useState } from "react";

export const DimensionsContext = createContext()

export const DimensionsContextProvider = ({ children }) => {
    const [dimensions, setDimensions] = useState({
        scrollY: 0,
        windowWidth: window.innerWidth
    })

    const scrollHandler = useCallback(function () {
        setDimensions(state => ({ ...state, scrollY: this.scrollY }))
    }, [])

    const widthHandler = useCallback(function () {
        let windowWidth = this.innerWidth

        setDimensions(state => ({ ...state, windowWidth }))
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