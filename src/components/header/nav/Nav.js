import { Link, NavLink } from "react-router-dom"

import style from './style.module.css'
import { useCallback, useContext, useRef } from "react"
import { AuthContext } from "../../common/context/AuthContext"
import { HomeSVG } from "../../common/svg/HomeSVG"
import { ProfileSVG } from "../../common/svg/ProfileSVG"
import { NavItem } from "./NavItem"

export const Nav = () => {
    const { user: { verified, roles, _id } } = useContext(AuthContext)

    const adminUlRef = useRef()
    const adminPRef = useRef()

    const ActiveClassNameHandler = ({ isActive }) => isActive ? style.activeLink : style.inactiveLink

    const adminNavHandler = useCallback(e => {
        adminUlRef.current.style.display = e.type === 'click' || e.type === 'mouseover' ? 'block' : 'none'
    }, [])

    return (
        <div className={style.allNav}>
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

