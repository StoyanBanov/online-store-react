import { createContext, useCallback, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(window.sessionStorage.getItem('user')) ?? {})

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