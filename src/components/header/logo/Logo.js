import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import style from './style.module.css'

export const Logo = () => {
    const navigate = useNavigate()

    const homeClickHandler = useCallback(() => {
        navigate('/')
    }, [navigate])

    return (
        <p onClick={homeClickHandler} className={style.typeText}>
            <span className={style.typeLower}>ne</span>
            <span className={style.typeUpper}>MAG</span>
        </p>
    )
}