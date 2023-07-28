import { useEffect, useState } from 'react'
import style from '../style.module.css'

export const ItemFormImage = ({ image, imageHandler, isRemovable = true }) => {
    const [isRemoving, setIsRemoving] = useState(false)
    const [imageSrc, setImageSrc] = useState('')

    useEffect(() => {
        if (typeof image !== 'string') {
            const fr = new FileReader()
            fr.addEventListener('load', () => {
                setImageSrc(fr.result);
            })
            fr.readAsDataURL(image)
        } else {
            setImageSrc(`http://localhost:3030/static/images/${image}`)
        }
    }, [image])

    const clickHandler = e => {
        imageHandler(image, !isRemoving)

        setIsRemoving(state => !state)
    }

    return (
        <div className={style.formImage} >
            {
                isRemovable && (
                    isRemoving
                        ? <svg onClick={clickHandler} className={style.removeSvg
                        } >
                            <line x1="0" y1="0" x2="20" y2="20" />
                            <line x1="0" y1="20" x2="20" y2="0" />
                        </svg >
                        : <svg onClick={clickHandler} className={style.addSvg}>
                            <line x1="5" y1="10" x2="10" y2="20" />
                            <line x1="10" y1="20" x2="20" y2="0" />
                        </svg>
                )
            }

            {
                imageSrc &&
                <img width={100} src={imageSrc} alt={''} />
            }
        </div>
    )
}