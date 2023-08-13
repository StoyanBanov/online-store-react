import { useCallback } from 'react';
import style from './style.module.css'
import { useNavigate } from 'react-router-dom';

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
            <h2 onClick={onItemCardClick}>{item.title}</h2>
        </div>
    )
}