export const Price = ({ item }) => {
    return (
        <p style={{ margin: 0, display: 'block' }}>
            {item.discount > 0 &&
                <>
                    {`Price: ${(item.price * item.discount / 100).toFixed(2)}$`}
                    <br />
                </>
            }

            {item.discount > 0
                ? <>
                    <span style={{ textDecoration: 'line-through' }}>{item.price.toFixed(2)}$</span>
                    (-{item.discount}%)
                </>
                : `Price: ${item.price.toFixed(2)}$`}
        </p>
    )
}