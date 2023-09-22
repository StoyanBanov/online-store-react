import { useCallback, useRef } from "react"

import style from './style.module.css'

let isHovering = false

export const NavItem = ({ children, name }) => {

    const itemRef = useRef()

    const profileHandler = useCallback(e => {
        const isHover = e.type === 'mouseenter'
        if (!isHovering) {
            isHovering = true

            if (isHover) {
                isHovering = true
                let count = 0
                let total = 0
                const interval = setInterval(() => {
                    itemRef.current.style.width = (total += 10) + 'px'
                    if (++count === 5) {
                        clearInterval(interval)
                        isHovering = false
                    }
                }, 30)
            } else {
                let count = 0
                let total = 50
                const interval = setInterval(() => {
                    itemRef.current.style.width = (total -= 10) + 'px'
                    if (++count === 5) {
                        clearInterval(interval)
                        isHovering = false
                    }
                }, 30)
            }
        }
    }, [])
    return (
        <div className={style.navLinkItem} onMouseEnter={profileHandler} onMouseLeave={profileHandler}>
            {children}

            <span className={style.navItemText} ref={itemRef}>{name}</span>
        </div>
    )
}