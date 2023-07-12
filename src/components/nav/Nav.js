import { Link } from "react-router-dom"

import style from './style.module.css'

export const Nav = () => {
    return (
        <nav className={style.navContainer}>
            <Link to={'/'}>Home</Link>
            <Link to={'/create/category'}>Create Category</Link>
            <Link to={'/create/item'}>Create Item</Link>

            <Link to={'/register'}>Register</Link>
            <Link to={'/login'}>Login</Link>
        </nav>
    )
}

