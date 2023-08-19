export function calcPriceTooltipLeft(value, maxPrice, minPrice) {
    const left = (value - minPrice) * 55 / (maxPrice - minPrice)
    return `calc(${left}% + (${8 - left * 0.15}px) + 17%)`;
}