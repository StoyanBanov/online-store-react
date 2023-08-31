import { useContext, useState } from "react"
import { DimensionsContext } from "../common/context/DimensionsContext"
import { MOBILE_MAX_WIDTH } from "../../constants"

export const CarouselArrowButton = ({ direction, slideHandler }) => {
    const { windowWidth } = useContext(DimensionsContext)

    const isMobile = windowWidth > MOBILE_MAX_WIDTH

    const [arrowStyle, setArrowStyle] = useState({
        fill: isMobile ? 'white' : 'transparent',
        stroke: isMobile ? 'black' : '',
        strokeWidth: 1
    })

    const btnHoverHandler = () => {
        if (isMobile)
            setArrowStyle(state => ({ ...state, fill: 'white', stroke: 'gray' }))
        else
            setArrowStyle(state => ({ ...state, fill: 'transparent', stroke: 'gray' }))
    }

    const btnMouseOutHandler = () => {
        if (isMobile)
            setArrowStyle(state => ({ ...state, fill: 'white', stroke: 'black' }))
        else
            setArrowStyle(state => ({ ...state, fill: 'transparent', stroke: '' }))
    }

    return (
        <button onClick={e => slideHandler(e, direction)} onMouseOver={btnHoverHandler} onMouseOut={btnMouseOutHandler}>
            <svg height={40} width={40}>
                {direction === 'left'
                    ? <polygon points="30,0 0,15 30,30" style={arrowStyle} />
                    : <polygon points="0,0 30,15 0,30" style={arrowStyle} />
                }
            </svg>
        </button>
    )
}