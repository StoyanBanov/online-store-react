import { useCallback, useEffect, useState } from "react"

let isSliding = false

export const useCarousel = (refCarousel) => {
    const [displayCarouselButtons, setDisplayCarouselButtons] = useState({ left: false, right: true })

    const [width, setWidth] = useState()

    useEffect(() => {
        const carouselDivWidth = refCarousel.current.parentElement.offsetWidth
        setDisplayCarouselButtons({
            left: refCarousel.current.offsetLeft !== 0,
            right: refCarousel.current.offsetLeft + width > carouselDivWidth
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

        let totalSteps = 0
        const interval = setInterval(() => {
            totalSteps += step

            if (totalSteps >= carouselDivWidth) {
                totalSteps = carouselDivWidth
                clearInterval(interval)
                isSliding = false
            }

            refCarousel.current.style.left = refCarousel.current.offsetLeft + (direction === 'left' ? step : -step) + 'px'

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