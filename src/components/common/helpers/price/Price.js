import style from './style.module.css'

export const Price = ({ item }) => {
    return (
        <p style={{ margin: 0, display: 'block' }}>
            <span>Price: </span>

            {item.discount > 0
                ? <>
                    <span className={style.discountedPrice}>
                        ${(item.price * item.discount / 100).toFixed(2)}$
                    </span>

                    <br />

                    <span className={style.oldPrice}>
                        {item.price.toFixed(2)}$
                    </span>
                    (-{item.discount}%)
                </>
                : `${item.price.toFixed(2)}$`
            }
        </p>
    )
}