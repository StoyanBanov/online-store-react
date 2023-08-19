import { useCallback, useEffect, useRef } from 'react'
import style from './style.module.css'
import { useQueryParams } from '../../common/hooks/useQeryParams'

export const ItemPriceFilter = ({ minPrice, maxPrice, updateFilters }) => {
    const minPriceRef = useRef()
    const maxPriceRef = useRef()

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
    }, [])

    return (
        <div className={style.priceRange}>
            <span>{minPrice}</span>
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
            <span>{maxPrice}</span>
        </div>
    )
}