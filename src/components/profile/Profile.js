import { NavLink, Outlet } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { getUserData } from "../../data/services/userService"

import style from './style.module.css'

export const Profile = () => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getUserData()
            .then(setUserData)
    }, [])

    const changeUserData = useCallback((key, value) => {
        setUserData(state => ({ ...state, [key]: value }))
    }, [])

    return (
        <div className={style.profileContainer}>
            <aside>
                <ul>
                    <li><NavLink to={'userPurchases'}>My Purchases</NavLink></li>
                    <li><NavLink to={'userAddresses'}>My Addresses</NavLink></li>
                    <li><NavLink to={'userData'}>My Personal Data</NavLink></li>
                </ul>
            </aside>

            <Outlet context={{ userData, changeUserData }} />
        </div>
    )
}