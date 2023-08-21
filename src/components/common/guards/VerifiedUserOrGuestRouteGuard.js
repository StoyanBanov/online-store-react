import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const VerifiedUserOrGuestRouteGuard = () => {
    const { user: { verified, accessToken } } = useContext(AuthContext)
    return !accessToken || verified ? <Outlet /> : <Navigate to={'/non-verified'} replace />
}