import { useCallback, useEffect, useRef, useState } from 'react'
import style from './style.module.css'
import styleDetails from './itemDetails/style.module.css'
import { useCarousel } from '../common/hooks/useCarousel'
import { IMAGES_DIR } from '../../constants'
import { CloseSVG } from '../common/svg/CloseSVG'
import { IMAGE_OVERLAY_MOVE_LEFT, IMAGE_OVERLAY_MOVE_RiGHT } from './constants'

export const ItemDetailsImages = ({ images }) => {
    const [imageIndex, setImageIndex] = useState(0)

    const [showImageOverlay, setShowImageOverlay] = useState()

    const carouselRef = useRef()

    const [slideHandler, displayCarouselButtons, setInitialWidth] = useCarousel(carouselRef)

    useEffect(() => {
        setInitialWidth()
    }, [setInitialWidth, images])

    const carouselImgHoverHandler = useCallback(imgIndex => {
        setImageIndex(imgIndex)
    }, [])

    const imageOverlayCloseHandler = useCallback(e => {
        if (e.target === e.currentTarget) setShowImageOverlay(false)
    }, [])

    const imageOverlayChangeImageHandler = useCallback(direction => {
        if (direction === IMAGE_OVERLAY_MOVE_LEFT)
            setImageIndex(state => state === 0 ? images.length - 1 : state - 1)
        else if (direction === IMAGE_OVERLAY_MOVE_RiGHT)
            setImageIndex(state => state === images.length - 1 ? 0 : state + 1)
    }, [images.length])

    return (
        <div className={style.itemImages}>
            {images &&
                <>
                    <div className={style.mainImageContainer}>
                        <img onClick={() => setShowImageOverlay(true)} src={`${IMAGES_DIR}/${images[imageIndex]}`} alt={images[imageIndex]} />
                    </div>

                    {showImageOverlay &&
                        <>
                            <div className={styleDetails.imageOverlayCloseSvgContainer}>
                                <CloseSVG clickHandler={imageOverlayCloseHandler} stroke={'white'} strokeWidth={2} />
                            </div>

                            <div onClick={imageOverlayCloseHandler} className={styleDetails.imageOverlayContainer}>
                                <svg onClick={() => imageOverlayChangeImageHandler(IMAGE_OVERLAY_MOVE_LEFT)} width={40} height={80} stroke='white' strokeWidth={2}>
                                    <line x1={2} y1={40} x2={38} y2={2} />
                                    <line x1={2} y1={40} x2={38} y2={78} />
                                </svg>

                                <img className={styleDetails.mainImage} src={`${IMAGES_DIR}/${images[imageIndex]}`} alt={images[imageIndex]} />

                                <svg onClick={() => imageOverlayChangeImageHandler(IMAGE_OVERLAY_MOVE_RiGHT)} width={40} height={80} stroke='white' strokeWidth={2}>
                                    <line x2={2} y1={40} x1={38} y2={2} />
                                    <line x2={2} y1={40} x1={38} y2={78} />
                                </svg>
                            </div>
                        </>
                    }
                </>
            }

            <div className={style.detailsImageCarousel}>
                <div className={style.detailsImageCarouselContainer}>
                    <div ref={carouselRef} className={style.detailsImageCarouselItems}>
                        {
                            images.map((i, ind) =>
                                <img key={ind}
                                    onClick={() => setShowImageOverlay(true)}
                                    style={ind === imageIndex ? { outline: '1px solid green', outlineOffset: '-1px' } : {}}
                                    onMouseOver={() => carouselImgHoverHandler(ind)} src={`${IMAGES_DIR}/${i}`} alt={i}
                                />
                            )
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