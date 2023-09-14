import { Nav } from "./nav/Nav"
import { Search } from "./Search"
import { useCallback, useContext, useRef, useState } from "react"
import { DimensionsContext } from "../common/context/DimensionsContext"
import { CartButton } from "./CartButton"
import { MOBILE_MAX_WIDTH } from "../../constants"
import { usePop } from "../common/hooks/usePop"
import { PopBefore } from "../common/helpers/popBefore/PopBefore"
import { MobileNav } from "./nav/MobileNav"
import { MobileCartButton } from "./MobileCartButton"
import { Logo } from "./logo/Logo"

import style from './style.module.css'

export const Header = () => {
    const { windowWidth } = useContext(DimensionsContext)

    const navRef = useRef()

    const { displayPop: displayFilters, displayPopHandler } = usePop()

    const [displayMobileSearch, setDisplayMobileSearch] = useState(false)

    const mobileNavHandler = useCallback((isOpening) => {
        displayPopHandler(isOpening, navRef)
    }, [displayPopHandler, navRef])

    return (
        <>
            {windowWidth > MOBILE_MAX_WIDTH
                ? <>
                    <div className={style.searchContainer}>
                        <Logo />

                        <Search />

                        <CartButton />
                    </div>
                    <nav className={style.navContainer}>
                        <Nav />
                    </nav>
                </>
                : <nav className={style.mobileNavContainer}>
                    <svg onClick={mobileNavHandler} stroke="black" strokeWidth={2} width={30} height={30}>
                        <line x1={0} y1={2} x2={25} y2={2} />
                        <line x1={0} y1={10} x2={25} y2={10} />
                        <line x1={0} y1={18} x2={25} y2={18} />
                    </svg>

                    {displayFilters &&
                        <PopBefore popRef={navRef} displayPopClickHandler={mobileNavHandler}>
                            <MobileNav mobileNavHandler={mobileNavHandler} />
                        </PopBefore>
                    }

                    {
                        displayMobileSearch
                            ? <Search autoFocus={true} closeHandler={setDisplayMobileSearch.bind(null, false)} />
                            : <svg onClick={() => setDisplayMobileSearch(true)} viewBox="0 0 24 24" fill="none" stroke="black" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g fill="none" id="SVGRepo_iconCarrier">
                                    <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                    }

                    <Logo />


                    <MobileCartButton />
                </nav>
            }
        </>
    )
}