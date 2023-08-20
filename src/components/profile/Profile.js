import { NavLink, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserData } from "../../data/services/userService"

import style from './style.module.css'

export const Profile = () => {
    const [userData, setUserData] = useState()

    useEffect(() => {
        getUserData()
            .then(setUserData)
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

            <Outlet context={userData} />
        </div>
    )
}