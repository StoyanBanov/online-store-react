import { createContext, useCallback, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    useEffect(() => {
        const user = JSON.parse(window.sessionStorage.getItem('user'))
        if (user) setUser(user)
    }, [])

    const setUserData = useCallback(userData => {
        sessionStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    }, [])

    const removeUser = useCallback(userData => {
        sessionStorage.removeItem('user')
        setUser({})
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            setUserData,
            removeUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}