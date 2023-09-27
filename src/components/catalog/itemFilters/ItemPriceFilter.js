import { useCallback, useEffect, useRef } from 'react'
import { useQueryParams } from '../../common/hooks/useQeryParams'

import style from './style.module.css'
import { calcPriceTooltipLeft } from './util'

export const ItemPriceFilter = ({ minPrice, maxPrice, updateFilters }) => {
    const minPriceRef = useRef()
    const maxPriceRef = useRef()

    const minPriceSpanRef = useRef()
    const maxPriceSpanRef = useRef()

    const { searchParamsObj } = useQueryParams()

    useEffect(() => {
        if (searchParamsObj && minPrice && maxPrice) {
            const min = Number(searchParamsObj.minPrice) ?? minPrice
            const max = Number(searchParamsObj.maxPrice) ?? maxPrice

            const minValue = min
                && min >= minPrice
                && min <= max
                ? min
                : minPrice

            const maxValue = max
                && max <= maxPrice
                && max >= min
                ? max
                : maxPrice

            minPriceRef.current.value = minValue
            maxPriceRef.current.value = maxValue

            minPriceSpanRef.current.textContent = minPrice
            maxPriceSpanRef.current.textContent = maxPrice

            minPriceSpanRef.current.textContent = minValue
            minPriceSpanRef.current.parentElement.style.left = calcPriceTooltipLeft(minValue, maxPrice, minPrice)

            maxPriceSpanRef.current.textContent = maxValue
            maxPriceSpanRef.current.parentElement.style.left = calcPriceTooltipLeft(maxValue, maxPrice, minPrice)

            if (minValue === maxValue || minValue === maxValue - 1) {
                minPriceRef.current.disabled = true
                maxPriceRef.current.disabled = true
            } else if (minPriceRef.current.disabled) {
                minPriceRef.current.disabled = false
                maxPriceRef.current.disabled = false
            }

        }
    }, [minPrice, maxPrice, searchParamsObj])

    const dragEndHandler = useCallback(e => {
        window.removeEventListener('mouseup', dragEndHandler)
        window.removeEventListener('touchend', dragEndHandler)

        updateFilters(minPriceRef.current, maxPriceRef.current)
    }, [updateFilters])

    const startDraggingHandler = useCallback(e => {
        window.addEventListener('mouseup', dragEndHandler)
        window.addEventListener('touchend', dragEndHandler)
    }, [dragEndHandler])

    const dragHandler = useCallback(e => {
        if (e.target === minPriceRef.current && Number(minPriceRef.current.value) > Number(maxPriceRef.current.value) - 10) {
            e.target.value = Number(maxPriceRef.current.value) - 10
        } else if (e.target === maxPriceRef.current && Number(minPriceRef.current.value) > Number(maxPriceRef.current.value) - 10) {
            e.target.value = Number(minPriceRef.current.value) + 10
        }

        if (e.target === minPriceRef.current) {
            minPriceSpanRef.current.textContent = minPriceRef.current.value

            minPriceSpanRef.current.parentElement.style.left = calcPriceTooltipLeft(minPriceRef.current.value, maxPrice, minPrice)
        } else {
            maxPriceSpanRef.current.textContent = maxPriceRef.current.value

            maxPriceSpanRef.current.parentElement.style.left = calcPriceTooltipLeft(maxPriceRef.current.value, maxPrice, minPrice)
        }
    }, [maxPrice, minPrice])

    return (
        <div className={style.priceRange}>
            <div className={style.priceCurrentValue}>
                <span ref={minPriceSpanRef}></span>
            </div>

            <div className={style.priceCurrentValue} >
                <span ref={maxPriceSpanRef}></span>
            </div>

            <input
                ref={minPriceRef}
                name='minPrice'
                onMouseDown={startDraggingHandler}
                onTouchStart={startDraggingHandler}
                onChange={dragHandler}
                min={minPrice}
                max={maxPrice}
                type='range'
            />

            <input
                ref={maxPriceRef}
                name='maxPrice'
                onMouseDown={startDraggingHandler}
                onTouchStart={startDraggingHandler}
                onChange={dragHandler}
                min={minPrice}
                max={maxPrice}
                type='range'
            />
        </div>
    )
}