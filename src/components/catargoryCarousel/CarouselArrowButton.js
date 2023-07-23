import { useState } from "react"

export const CarouselArrowButton = ({ direction, slideHandler }) => {
    const [arrowStyle, setArrowStyle] = useState({
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1
    })

    const btnHoverHandler = () => {
        setArrowStyle(state => ({ ...state, fill: 'gray', }))
    }

    const btnMouseOutHandler = () => {
        setArrowStyle(state => ({ ...state, fill: 'white', }))
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