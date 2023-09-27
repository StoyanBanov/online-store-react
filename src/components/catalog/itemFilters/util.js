export function calcPriceTooltipLeft(value, maxPrice, minPrice) {
    const left = (value - minPrice) * 100 / (maxPrice - minPrice) - 8
    return `calc(${left}% + (${8 - left * 0.15}px))`;
}