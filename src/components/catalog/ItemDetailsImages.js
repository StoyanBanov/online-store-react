import { useCallback, useEffect, useRef, useState } from 'react'
import style from './style.module.css'
import styleDetails from './itemDetails/style.module.css'
import { useCarousel } from '../common/hooks/useCarousel'
import { IMAGES_DIR } from '../../constants'
import { DETAILS_IMAGE_OVERLAY_ID } from './constants'
import { CloseSVG } from '../common/svg/CloseSVG'

export const ItemDetailsImages = ({ thumbnail, images }) => {
    const [image, setImage] = useState()

    const [showImageOverlay, setShowImageOverlay] = useState()

    const carouselRef = useRef()

    useEffect(() => {
        setImage(thumbnail)
    }, [thumbnail])

    const [slideHandler, displayCarouselButtons, setInitialWidth] = useCarousel(carouselRef)

    useEffect(() => {
        setInitialWidth()
    }, [setInitialWidth, thumbnail, images])

    const carouselImgHoverHandler = useCallback(e => {
        setImage(e.target.src.split('/').slice(-1)[0])
    }, [])

    const imageOverlayCloseHandler = useCallback(e => {
        if (e.target.id !== DETAILS_IMAGE_OVERLAY_ID) setShowImageOverlay(false)
    }, [])

    return (
        <div className={style.itemImages}>
            {image &&
                <>
                    <div className={style.mainImageContainer}>
                        <img onClick={() => setShowImageOverlay(true)} src={`${IMAGES_DIR}/${image}`} alt={image} />
                    </div>

                    {showImageOverlay &&
                        <>
                            <div className={styleDetails.imageOverlayCloseSvgContainer}>
                                <CloseSVG clickHandler={imageOverlayCloseHandler} stroke={'white'} />
                            </div>

                            <div onClick={imageOverlayCloseHandler} className={styleDetails.imageOverlayContainer}>
                                <img className={styleDetails.mainImage} id={DETAILS_IMAGE_OVERLAY_ID} src={`${IMAGES_DIR}/${image}`} alt={image} />
                            </div>
                        </>
                    }
                </>
            }

            <div className={style.detailsImageCarousel}>
                <div className={style.detailsImageCarouselContainer}>
                    <div ref={carouselRef} className={style.detailsImageCarouselItems}>
                        {
                            [thumbnail, ...images].map(i => <img key={i} style={i === image ? { outline: '1px solid green', outlineOffset: '-1px' } : {}} onMouseOver={carouselImgHoverHandler} src={`${IMAGES_DIR}/${i}`} alt={i} />)
                        }
                    </div>
                </div>

                {
                    displayCarouselButtons.left &&
                    <svg className={style.detailsCarouselLeftBtn} onClick={e => slideHandler(e, 'left')}>
                        <line x1={2} y1={20} x2={20} y2={2} stroke='black' strokeWidth={5} />
                        <line x1={2} y1={20} x2={20} y2={38} stroke='black' strokeWidth={5} />
                    </svg>
                }

                {
                    displayCarouselButtons.right &&
                    <svg className={style.detailsCarouselRightBtn} onClick={e => slideHandler(e, 'right')}>
                        <line x1={2} y1={2} x2={20} y2={20} stroke='black' strokeWidth={5} />
                        <line x1={2} y1={38} x2={20} y2={20} stroke='black' strokeWidth={5} />
                    </svg>
                }
            </div>

        </div>
    )
}