import { useCallback, useState } from "react"
import { Outlet } from "react-router-dom"

export const Purchase = () => {
    const [purchase, setPurchase] = useState()

    const setPurchaseHandler = useCallback((data) => {
        setPurchase(data)
    }, [])

    return (
        <Outlet context={{ setPurchaseHandler, purchase }} />
    )
}