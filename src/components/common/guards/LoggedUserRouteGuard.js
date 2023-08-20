import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export const LoggedUserRouteGuard = () => {
    const { user: { verified } } = useContext(AuthContext)
    return verified ? <Outlet /> : <Navigate to={'/login'} replace />
}