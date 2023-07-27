import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const AdminUserRouteGuard = () => {
    const { user } = useContext(AuthContext)
    return user.roles?.includes('admin') ? <Outlet /> : <Navigate to={'/'} replace />
}