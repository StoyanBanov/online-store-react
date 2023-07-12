import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export const GuestUserRouteGuard = () => {
    const { user: { verified } } = useContext(AuthContext)
    return verified ? <Navigate to={'/'} replace /> : <Outlet />
}