import { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addUserRatingForItemId, getItemById, getUserRatingForItemId } from '../../data/services/itemService'

import { AuthContext } from '../common/context/AuthContext'

import style from './style.module.css'

export const ItemDetails = () => {
    const { user: { roles, _id } } = useContext(AuthContext)

    const { itemId } = useParams()

    const [item, setItem] = useState({})
    const [itemRating, setItemRating] = useState(0)
    const [userRating, setUserRating] = useState(0)

    useEffect(() => {
        getItemById(itemId)
            .then(i => {
                setItem(i)
                setItemRating(i.rating)
                getUserRatingForItemId(i._id)
                    .then(([r]) => setUserRating(r.rating))
            })
    }, [itemId])

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
            const rating = Number(e.target.id) + 1
            setUserRating(rating)
            setItemRating(item.rating + rating / (item.totalRatingVotes + 1))
            await addUserRatingForItemId(item._id, rating)
        } else window.alert('login or register to vote')
    }, [_id, item])

    //TODO fix rating bugs
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
                    {(!roles || (roles && !roles.includes('admin'))) &&
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
                        </>
                    }
                </>
            }
        </div>
    )
}