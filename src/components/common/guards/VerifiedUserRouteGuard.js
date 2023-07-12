import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const VerifiedUserRouteGuard = () => {
    const { user: { verified } } = useContext(AuthContext)
    console.log(verified);
    return verified ? <Outlet /> : <Navigate to={'/'} replace />
}