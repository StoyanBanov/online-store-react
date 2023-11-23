export const CloseSVG = ({ clickHandler, stroke, strokeWidth }) => {
    return (
        <svg onClick={clickHandler} width={22} height={22} stroke={stroke || "black"} strokeWidth={strokeWidth || 1}>
            <line x1={2} y1={2} x2={20} y2={20} />
            <line x1={2} y1={20} x2={20} y2={2} />
        </svg>
    )
}