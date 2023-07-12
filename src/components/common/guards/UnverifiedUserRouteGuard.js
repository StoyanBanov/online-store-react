import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const UnverifiedUserRouteGuard = () => {
    const { user } = useContext(AuthContext)
    return !user.verified && user.email ? <Navigate to={'/non-verified'} replace /> : <Outlet />
}