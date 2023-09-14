import { useCallback, useEffect, useState } from "react"

let isSliding = false

export const useCarousel = (refCarousel) => {
    const [displayCarouselButtons, setDisplayCarouselButtons] = useState({ left: false, right: true })

    const [width, setWidth] = useState()

    useEffect(() => {
        const carouselDivWidth = refCarousel.current.parentElement.offsetWidth
        setDisplayCarouselButtons({
            left: refCarousel.current.offsetLeft !== 0,
            right: refCarousel.current.offsetLeft + width > carouselDivWidth + 7
        })
    }, [refCarousel, width])

    const setInitialWidthWidth = useCallback(() => {
        setWidth(refCarousel.current.offsetWidth)
    }, [refCarousel])

    const slideHandler = useCallback((e, direction) => {
        e.preventDefault()

        if (isSliding) return

        const carouselDivWidth = refCarousel.current.parentElement.offsetWidth

        isSliding = true

        const step = carouselDivWidth / 50

        const initialPosition = refCarousel.current.offsetLeft

        let totalSteps = 0
        const interval = setInterval(() => {
            totalSteps += step
            refCarousel.current.style.left = refCarousel.current.offsetLeft + (direction === 'left' ? step : -step) + 'px'

            if (totalSteps >= carouselDivWidth) {
                refCarousel.current.style.left = initialPosition + + (direction === 'left' ? carouselDivWidth : -carouselDivWidth) + 'px'
                clearInterval(interval)
                isSliding = false
            }

            if (!isSliding) {
                setDisplayCarouselButtons({
                    left: refCarousel.current.offsetLeft !== 0,
                    right: refCarousel.current.offsetLeft + refCarousel.current.offsetWidth > carouselDivWidth
                })
            }

        }, 10)

    }, [refCarousel])

    return [slideHandler, displayCarouselButtons, setInitialWidthWidth]
}