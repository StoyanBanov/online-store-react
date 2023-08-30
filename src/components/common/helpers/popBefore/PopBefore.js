import style from './style.module.css'

export const PopBefore = ({ popRef, displayPopClickHandler, children, closeBtnText }) => {
    return (
        <>
            <div onClick={() => displayPopClickHandler(false)} className={style.popBefore} />
            <div ref={popRef} className={style.popContainer}>
                <div className={style.popHeader}>
                    <svg id="catClose" onClick={() => displayPopClickHandler(false)} width={30} height={30} stroke="black" strokeWidth={2}>
                        <line x1={2} y1={2} x2={28} y2={28} />
                        <line x1={2} y1={28} x2={28} y2={2} />
                    </svg>
                </div>

                {children}

                {closeBtnText &&
                    <div onClick={() => displayPopClickHandler(false)} className={style.popCloseBtnContainer}>
                        <button>{closeBtnText}</button>
                    </div>
                }
            </div>
        </>
    )
}