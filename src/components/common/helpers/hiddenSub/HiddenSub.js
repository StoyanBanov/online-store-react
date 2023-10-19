import { useCallback, useEffect, useState } from 'react'
import style from './style.module.css'

export const HiddenSub = ({ children, title, initialVisibility = false }) => {
    const [itemsVisibility, setItemsVisibility] = useState(false)

    useEffect(() => {
        setItemsVisibility(initialVisibility)
    }, [initialVisibility])

    const showNavItemHandler = useCallback(e => {
        if (e.target.tagName !== 'BUTTON')
            setItemsVisibility(state => !state)
    }, [])

    return (
        <div style={itemsVisibility ? { color: 'black' } : { color: 'rgb(70, 70, 70)' }} className={style.hiddenSubContainer}>
            <div onClick={showNavItemHandler} className={style.hiddenSubTop}>
                <div>
                    <span style={itemsVisibility ? { fontWeight: 'bold' } : {}}>{title}</span>
                </div>

                <svg width={18} height={18} fill="none" stroke="black" strokeWidth={2}>
                    {itemsVisibility
                        ? <path d={'M2 2 L9 14 L16 2'} />
                        : <path d={'M12 2 L2 9 L12 16'} />
                    }
                </svg>
            </div>

            {itemsVisibility &&
                <div className={style.hiddenSubBot}>
                    {children}
                </div>
            }
        </div>
    )
}