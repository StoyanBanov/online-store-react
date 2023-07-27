import { useCallback } from 'react';
import style from './style.module.css'
import { useNavigate } from 'react-router-dom';

export const ItemCard = ({ item }) => {
    const navigate = useNavigate()

    const onItemCardClick = useCallback(e => {
        navigate(`${item._id}`)
    }, [navigate, item])

    return (
        <div onClick={onItemCardClick} className={style.itemContainer}>
            <h2>{item.title}</h2>
            {item.thumbnail &&
                <img height={200} src={`http://localhost:3030/static/images/${item.thumbnail}`} alt={item.title} />
            }
        </div>
    )
}