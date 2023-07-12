import { Link } from "react-router-dom"

import style from './style.module.css'
import { useContext } from "react"
import { AuthContext } from "../common/context/AuthContext"

export const Nav = () => {
    const { user: { verified, roles, _id } } = useContext(AuthContext)

    return (
        <nav className={style.navContainer}>
            <Link to={'/'}>Home</Link>

            {verified && roles.includes('admin') &&
                <>
                    <Link to={'/create/category'}>Create Category</Link>
                    <Link to={'/create/item'}>Create Item</Link>
                </>
            }

            {!_id &&
                <>
                    <Link to={'/register'}>Register</Link>
                    <Link to={'/login'}>Login</Link>
                </>
            }

            {
                _id && <Link to={'/logout'}>Logout</Link>
            }
        </nav>
    )
}

