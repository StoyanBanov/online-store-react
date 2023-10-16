import { Link, NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../common/context/AuthContext"
import { HomeSVG } from "../../common/svg/HomeSVG"
import { ProfileSVG } from "../../common/svg/ProfileSVG"
import { NavItem } from "./NavItem"
import { AdminNav } from "./AdminNav"

import style from './style.module.css'

export const Nav = () => {
    const { user: { verified, roles, _id } } = useContext(AuthContext)

    const ActiveClassNameHandler = ({ isActive }) => isActive ? style.activeLink : style.inactiveLink

    return (
        <div className={style.allNav}>
            {verified && roles.includes('admin') &&
                <AdminNav />
            }

            <div className={style.navMidContainer}>
                <NavLink to={'/'} className={ActiveClassNameHandler}>
                    <NavItem name={'Home'}>
                        <HomeSVG />
                    </NavItem>
                </NavLink>
                <NavLink to={'/catalog'} className={ActiveClassNameHandler}>Catalog</NavLink>
            </div>

            {!_id &&
                <div className={style.navRightContainer}>
                    <NavLink to={'/login'} className={ActiveClassNameHandler}>Login</NavLink>
                    <NavLink to={'/register'} className={ActiveClassNameHandler}>Register</NavLink>
                </div>
            }

            {
                _id &&
                <div className={style.navRightContainer}>
                    <NavLink to={'/profile'} className={ActiveClassNameHandler}>
                        <NavItem name={'Profile'}>
                            <ProfileSVG />
                        </NavItem>
                    </NavLink>
                    <Link to={'/logout'} className={style.inactiveLink}>Logout</Link>
                </div>
            }
        </div>
    )
}

