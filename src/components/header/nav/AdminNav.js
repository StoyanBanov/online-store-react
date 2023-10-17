import { useCallback, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import style from './style.module.css'

export const AdminNav = () => {
    const adminUlRef = useRef()
    const adminPRef = useRef()

    const adminNavHandler = useCallback(e => {
        adminUlRef.current.style.display = e.type === 'click' || e.type === 'mouseover' ? 'block' : 'none'
    }, [])

    return (
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
                    <NavLink to={'/admin/create/category'} >Create Category</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/create/item'} >Create Item</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/create/purchases'} >Purchases</NavLink>
                </li>
            </ul>
        </div>
    )
}