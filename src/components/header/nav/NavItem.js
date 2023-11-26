import { useCallback, useEffect, useRef, useState } from "react"

import style from './style.module.css'
import { useLocation } from "react-router-dom"

let isHovering = false

export const NavItem = ({ children, name }) => {
    const [isActive, setIsActive] = useState(false)

    const location = useLocation()

    const itemRef = useRef()

    useEffect(() => {
        setIsActive(location.pathname.includes(`/${name.toLowerCase()}`) || (location.pathname === '/' && name === 'Home'))
    }, [location, name])

    const profileHandler = useCallback(e => {
        if (isActive) return

        const isHover = e.type === 'mouseenter'
        if (!isHovering) {
            isHovering = true

            let count = 0
            let [total, step] = isHover ? [0, 10] : [50, -10]
            const interval = setInterval(() => {
                itemRef.current.style.width = (total += step) + 'px'
                if (++count === 5) {
                    clearInterval(interval)
                    isHovering = false
                }
            }, 30)
        }
    }, [isActive])

    return (
        <div className={style.navLinkItem} onMouseEnter={profileHandler} onMouseLeave={profileHandler}>
            {children}

            <span style={{ width: isActive ? '50px' : '0' }} className={style.navItemText} ref={itemRef}>{name}</span>
        </div>
    )
}