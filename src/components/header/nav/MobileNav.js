import { Link, NavLink } from "react-router-dom"

import style from './style.module.css'
import { useCallback, useContext } from "react"
import { AuthContext } from "../../common/context/AuthContext"
import { AdminNav } from "./AdminNav"

export const MobileNav = ({ mobileNavHandler }) => {
    const { user: { verified, roles, _id } } = useContext(AuthContext)

    const ActiveClassNameHandler = ({ isActive }) => isActive ? style.activeLink : style.inactiveLink

    const closeMobileNavHandler = useCallback(() => {
        mobileNavHandler(false)
    }, [mobileNavHandler])

    return (
        <div onClick={closeMobileNavHandler} className={style.mobileNavItems}>
            {verified && roles.includes('admin') &&
                <AdminNav />
            }

            <NavLink to={'/'} className={ActiveClassNameHandler}>Home</NavLink>
            <NavLink to={'/catalog'} className={ActiveClassNameHandler}>Catalog</NavLink>

            {!_id &&
                <>
                    <NavLink to={'/login'} className={ActiveClassNameHandler}>Login</NavLink>
                    <NavLink to={'/register'} className={ActiveClassNameHandler}>Register</NavLink>
                </>
            }

            {
                _id &&
                <>
                    <NavLink to={'/profile'} className={ActiveClassNameHandler}>
                        <svg height={20} width={20}>
                            <circle cx="10" cy="7" r="5" />
                            <circle cx="10" cy="23" r="10" />
                        </svg>
                    </NavLink>
                    <Link to={'/logout'} className={style.inactiveLink}>Logout</Link>
                </>
            }


        </div>
    )
}

