import { Link, NavLink } from "react-router-dom"

import style from './style.module.css'
import { useCallback, useContext, useRef } from "react"
import { AuthContext } from "../../common/context/AuthContext"

export const MobileNav = () => {
    const { user: { verified, roles, _id } } = useContext(AuthContext)

    const adminUlRef = useRef()
    const adminPRef = useRef()

    const ActiveClassNameHandler = ({ isActive }) => isActive ? style.activeLink : style.inactiveLink

    const adminNavHandler = useCallback(e => {
        adminUlRef.current.style.display = e.type === 'click' || e.type === 'mouseover' ? 'block' : 'none'
    }, [])

    return (
        <div className={style.mobileNavItems}>
            {verified && roles.includes('admin') &&
                <>
                    <div className={style.adminNav}>
                        <p id="adminDrop"
                            ref={adminPRef}
                            onMouseOver={adminNavHandler}
                            onMouseLeave={adminNavHandler}
                        >
                            Admin
                        </p>
                        <ul
                            onClick={adminNavHandler}
                            onMouseOver={adminNavHandler}
                            onMouseLeave={adminNavHandler}
                            ref={adminUlRef}
                            className={style.adminDropDown}
                        >
                            <li>
                                <NavLink to={'/admin/create/category'} className={ActiveClassNameHandler}>Create Category</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/admin/create/item'} className={ActiveClassNameHandler}>Create Item</NavLink>
                            </li>
                        </ul>
                    </div>
                </>
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

