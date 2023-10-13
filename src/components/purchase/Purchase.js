import { useCallback, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const Purchase = () => {
    const [purchase, setPurchase] = useState({})

    const navigate = useNavigate()

    const setPurchaseHandler = useCallback((data) => {
        setPurchase(data)
        navigate('/purchase/details')
    }, [navigate])

    return (
        <Outlet context={{ setPurchaseHandler, purchase }} />
    )
}