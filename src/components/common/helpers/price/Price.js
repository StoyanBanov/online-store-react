import style from './style.module.css'

export const Price = ({ item: price, discount }) => {
    return (
        <p style={{ margin: 0, display: 'block' }}>
            <span>Price: </span>

            {discount > 0
                ? <>
                    <span className={style.discountedPrice}>
                        ${(price * (1 - discount / 100)).toFixed(2)}$
                    </span>

                    <br />

                    <span className={style.oldPrice}>
                        {price.toFixed(2)}$
                    </span>
                    (-{discount}%)
                </>
                : `${price.toFixed(2)}$`
            }
        </p>
    )
}