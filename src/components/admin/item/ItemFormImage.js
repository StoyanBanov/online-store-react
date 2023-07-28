import { useState } from 'react'
import style from '../style.module.css'

export const ItemFormImage = ({ imageName, addImageHandler, removeImageHandler }) => {
    const [isRemoving, setIsRemoving] = useState(false)

    const clickHandler = e => {
        if (!isRemoving)
            addImageHandler(imageName)
        else
            removeImageHandler(imageName)

        setIsRemoving(state => !state)
    }

    return (
        <div className={style.formImage}>
            {isRemoving
                ? <svg onClick={clickHandler} className={style.removeSvg}>
                    <line x1="0" y1="0" x2="20" y2="20" />
                    <line x1="0" y1="20" x2="20" y2="0" />
                </svg>
                : <svg onClick={clickHandler} className={style.addSvg}>
                    <line x1="5" y1="10" x2="10" y2="20" />
                    <line x1="10" y1="20" x2="20" y2="0" />
                </svg>
            }
            <img width={100} src={`http://localhost:3030/static/images/${imageName}`} alt={imageName} />
        </div>
    )
}