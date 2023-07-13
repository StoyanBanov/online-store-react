import style from './style.module.css'

export const ItemCard = ({ item }) => {
    return (
        <div className={style.itemContainer}>
            <h2>{item.title}</h2>
            <img height={200} src={`http://localhost:3030/static/images/${item.thumbnail}`} alt={item.title} />
        </div>
    )
}