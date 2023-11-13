import { useCallback, useRef } from "react"

import style from './style.module.css'

let isHovering = false

export const NavItem = ({ children, name }) => {

    const itemRef = useRef()

    const profileHandler = useCallback(e => {
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
    }, [])
    return (
        <div className={style.navLinkItem} onMouseEnter={profileHandler} onMouseLeave={profileHandler}>
            {children}

            <span className={style.navItemText} ref={itemRef}>{name}</span>
        </div>
    )
}