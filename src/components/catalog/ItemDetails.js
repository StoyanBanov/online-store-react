import { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addUserRatingForItemId, getItemById, getUserRatingForItemId } from '../../data/services/itemService'

import { AuthContext } from '../common/context/AuthContext'

import style from './style.module.css'
import { CartContext } from '../common/context/CartContext'

export const ItemDetails = () => {
    const { user: { roles, _id } } = useContext(AuthContext)

    const { addToCart } = useContext(CartContext)

    const { itemId } = useParams()

    const [item, setItem] = useState({})
    const [itemRating, setItemRating] = useState(0)
    const [userRating, setUserRating] = useState(0)

    useEffect(() => {
        getItemById(itemId)
            .then(async i => {
                setItem(i)
                setItemRating(i.rating)

                if (_id) {
                    getUserRatingForItemId(i._id, _id)
                        .then(([r]) => r && setUserRating(r.rating))
                }
            })
    }, [_id, itemId])

    const ratingStarMouseOverHandler = useCallback(e => {
        Array.from(e.currentTarget.children)
            .slice(itemRating, Number(e.target.id) + 1)
            .forEach(r => {
                if (e.type === 'mouseover') r.textContent = '★'
                else r.textContent = '☆'
            })
    }, [itemRating])

    const ratingStarClickHandler = useCallback(async e => {
        if (_id) {
            const uRating = Number(e.target.id) + 1
            let averagedUserRating = uRating
            if (userRating) {
                averagedUserRating -= userRating
                averagedUserRating /= item.totalRatingVotes
            } else averagedUserRating /= item.totalRatingVotes + 1

            setUserRating(uRating)
            setItemRating(state => state + averagedUserRating)
            await addUserRatingForItemId(item._id, uRating)
        } else window.alert('login or register to vote')
    }, [_id, item, userRating])

    return (
        <div>
            {item._id &&
                <>
                    <h2>{item.title}</h2>
                    <img width={100} src={`http://localhost:3030/static/images/${item.thumbnail}`} alt={item.title}></img>
                    <p>{item.description}</p>
                    {roles && roles.includes('admin') &&
                        <>
                            <Link to='edit'>Edit</Link>
                            <button>Delete</button>
                        </>
                    }
                    {(!roles || (roles.includes('user') && !roles.includes('admin'))) &&
                        <>
                            <p>
                                Rate:
                                <span
                                    onMouseOver={ratingStarMouseOverHandler}
                                    onMouseOut={ratingStarMouseOverHandler}
                                    onClick={ratingStarClickHandler}
                                >
                                    {
                                        ('★'.repeat(itemRating) + '☆'.repeat(5 - itemRating))
                                            .split('')
                                            .map((r, i) => <span id={i} key={i} className={`${style.ratingStar}${userRating > i ? ' ' + style.userRatingStar : ''}`}>{r}</span>)
                                    }
                                </span>
                                ({item.totalRatingVotes})
                            </p>
                            <p>Price: {item.price}</p>
                            <div>
                                <button onClick={() => addToCart(item, 1)}>Add To Cart</button>
                            </div>
                        </>
                    }
                </>
            }
        </div>
    )
}