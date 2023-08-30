import { useCallback, useState } from "react"

export const usePop = () => {
    const [displayPop, setDisplayPop] = useState(false)

    const displayPopHandler = useCallback((isOpening, ref) => {
        let leftPercent = isOpening ? -100 : 0
        const endPercent = leftPercent ? 0 : -100
        const step = leftPercent ? -10 : 10

        if (isOpening) {
            setDisplayPop(true)
        }

        const transition = setInterval(() => {
            if (ref.current) {
                leftPercent -= step
                ref.current.style.left = leftPercent + '%'

                if (leftPercent === endPercent) {
                    clearInterval(transition)
                    if (!isOpening)
                        setDisplayPop(false)
                }
            }
        }, 30)
    }, [])

    return {
        displayPop,
        displayPopHandler
    }
}