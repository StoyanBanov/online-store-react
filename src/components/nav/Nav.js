import { Link, NavLink } from "react-router-dom"

import style from './style.module.css'
import { useContext } from "react"
import { AuthContext } from "../common/context/AuthContext"

export const Nav = () => {
    const { user: { verified, roles, _id } } = useContext(AuthContext)

    const ActiveClassNameHandler = ({ isActive }) => (
        isActive ? style.activeLink : style.inactiveLink
    )

    return (
        <nav className={style.navContainer}>
            <NavLink to={'/'} className={ActiveClassNameHandler}>Home</NavLink>
            <NavLink to={'/catalog'} className={ActiveClassNameHandler}>Catalog</NavLink>

            {verified && roles.includes('admin') &&
                <>
                    <NavLink to={'/create/category'} className={ActiveClassNameHandler}>Create Category</NavLink>
                    <NavLink to={'/create/item'} className={ActiveClassNameHandler}>Create Item</NavLink>
                </>
            }

            {!_id &&
                <>
                    <NavLink to={'/register'} className={ActiveClassNameHandler}>Register</NavLink>
                    <NavLink to={'/login'} className={ActiveClassNameHandler}>Login</NavLink>
                </>
            }

            {
                _id && <Link to={'/logout'}>Logout</Link>
            }
        </nav>
    )
}

