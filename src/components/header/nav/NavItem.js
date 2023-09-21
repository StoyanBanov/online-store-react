import { useCallback, useState } from "react"

import style from './style.module.css'

export const NavItem = ({ children, name }) => {
    const [showItem, setShowItem] = useState(false)

    const profileHandler = useCallback(e => {
        setShowItem(e.type === 'mouseover')
    }, [])
    return (
        <div className={style.navLinkItem} onMouseOver={profileHandler} onMouseOut={profileHandler}>
            {children}

            {showItem &&
                <span>{name}</span>
            }
        </div>
    )
}