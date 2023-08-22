import { useNavigate } from "react-router-dom"
import { Nav } from "./nav/Nav"
import { Search } from "./Search"

import style from './style.module.css'

import { useCallback, useContext } from "react"
import { DimensionsContext } from "../common/context/DimensionsContext"
import { CartButton } from "./CartButton"

export const Header = () => {
    const navigate = useNavigate()

    const { windowWidth } = useContext(DimensionsContext)

    const homeClickHandler = useCallback(() => {
        navigate('/')
    }, [navigate])

    return (
        <>
            <div className={style.searchContainer}>
                <p onClick={homeClickHandler} className={style.typeText}>
                    <span className={style.typeLower}>ne</span>
                    {windowWidth > 400 &&
                        <span className={style.typeUpper}>MAG</span>
                    }

                </p>

                <Search />
                {windowWidth > 330 &&
                    <CartButton />
                }

            </div>
            <Nav />
            {windowWidth <= 330 &&
                <CartButton />
            }
        </>
    )
}