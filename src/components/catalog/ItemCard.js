import { useCallback } from 'react';
import style from './style.module.css'
import { useNavigate } from 'react-router-dom';
import { AddToCartButton } from '../common/helpers/addToCartButton/AddToCartButton';

export const ItemCard = ({ item }) => {
    const navigate = useNavigate()

    const onItemCardClick = useCallback(e => {
        navigate(`/catalog/${item.category.title}/${item.category._id}/${item._id}`)
    }, [navigate, item])

    return (
        <div className={style.itemContainer}>
            <div>
                {item.thumbnail &&
                    <img onClick={onItemCardClick} src={`http://localhost:3030/static/images/${item.thumbnail}`} alt={item.title} />
                }
            </div>

            <div className={style.itemInfo}>
                <h2 onClick={onItemCardClick}>{item.title}</h2>
                <span>{'★'.repeat(Math.round(item.rating))}{'☆'.repeat(5 - Math.round(item.rating))}</span>
                <p>{item.price.toFixed(2)}$</p>

                <AddToCartButton item={item} />
            </div>
        </div>
    )
}