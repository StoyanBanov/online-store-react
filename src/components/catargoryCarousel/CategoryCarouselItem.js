import style from './style.module.css'

export const CategoryCarouselItem = ({ item, index }) => {
    return (
        <div style={{ right: 800 - index * 200 + 'px' }} className={style.carouselIem}>
            <img className={style.carouselItemThumbnail} src={'http://localhost:3030/static/images/' + item.thumbnail} alt={`${item.title} thumbnail`} />
        </div >
    )
}