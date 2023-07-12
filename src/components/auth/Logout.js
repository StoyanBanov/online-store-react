import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../common/context/AuthContext"

export const Logout = () => {
    const { removeUser } = useContext(AuthContext)

    useEffect(() => {
        removeUser()
    }, [removeUser])

    return <Navigate to={'/'} replace />
}