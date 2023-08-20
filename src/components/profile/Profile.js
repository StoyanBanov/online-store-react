import { NavLink, Outlet } from "react-router-dom"

export const Profile = () => {
    return (
        <div>
            <aside>
                <ul>
                    <li><NavLink to={'userPurchases'}>My Purchases</NavLink></li>
                    <li><NavLink to={'userAddresses'}>My Addresses</NavLink></li>
                    <li><NavLink to={'userData'}>My Personal Data</NavLink></li>
                </ul>
            </aside>

            <Outlet />
        </div>
    )
}