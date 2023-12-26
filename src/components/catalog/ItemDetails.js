import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addUserRatingForItemId, deleteItemById, getCategoryById, getItemById, getUserRatingForItemId } from '../../data/services/itemService'

import { AuthContext } from '../common/context/AuthContext'

import style from './style.module.css'
import { ItemDetailsImages } from './ItemDetailsImages'
import { ItemReviews } from './itemDetails/ItemReviews'
import { AddToCartButton } from '../common/helpers/addToCartButton/AddToCartButton'
import { Price } from '../common/helpers/price/Price'

export const ItemDetails = () => {
    const { user: { roles, _id } } = useContext(AuthContext)

    const navigate = useNavigate()

    const { itemId } = useParams()

    const [item, setItem] = useState({})
    const [itemRating, setItemRating] = useState(0)
    const [userRating, setUserRating] = useState(0)
    const [totalRating, setTotalRating] = useState(0)

    const [showReviews, setShowReviews] = useState(false)

    useEffect(() => {
        getItemById(itemId)
            .then(i => {
                setItem(i)
                setItemRating(i.rating)
                setTotalRating(i.totalRatingVotes)

                getCategoryById(i.category)
                    .then(cat => setItem(state => ({ ...state, category: cat })))

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
                averagedUserRating /= totalRating
            } else {
                averagedUserRating /= totalRating + 1
                setTotalRating(state => state + 1)
            }

            setUserRating(uRating)
            setItemRating(state => state + averagedUserRating)
            await addUserRatingForItemId(item._id, uRating)
        } else window.alert('login or register to vote')
    }, [_id, item, userRating, totalRating])

    const deleteClickHandler = useCallback(async () => {
        await deleteItemById(item._id)
        navigate('/')
    }, [navigate, item])

    const showReviewsHandler = useCallback(() => {
        setShowReviews(state => !state)
    }, [])

    return (
        <div className={style.itemDetailsContainer}>
            {
                item._id &&
                <>
                    <div className={style.itemDetailsTop} >
                        <ItemDetailsImages images={[item.thumbnail].concat(item.images)} />

                        <div>
                            <h2>{item.title}</h2>

                            <h3 style={{ color: item.count ? 'green' : 'red' }}>{item.count ? 'In stock' : 'Sold out'}</h3>

                            <Price item={item} />

                            <div>
                                <AddToCartButton item={item} />
                            </div>
                        </div>
                    </div>

                    <p>
                        <strong>
                            Description:
                        </strong>
                        <br />
                        {item.description}
                    </p>

                    <p>
                        {item.category.itemFields &&
                            Object.keys(item.category.itemFields).map((k, i) => <p key={i}>{k}: {item[k]}</p>)
                        }
                    </p>

                    {roles && roles.includes('admin') &&
                        <>
                            <button onClick={() => navigate(`/admin/edit/item/${item._id}`)}>Edit</button>
                            <button onClick={deleteClickHandler}>Delete</button>
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
                                        ('★'.repeat(Math.round(itemRating)) + '☆'.repeat(5 - Math.round(itemRating)))
                                            .split('')
                                            .map((r, i) => <span id={i} key={i} className={`${style.ratingStar}${userRating > i ? ' ' + style.userRatingStar : ''}`}>{r}</span>)
                                    }
                                    {/* <svg id="svgelem" width="19" height="18" xmlns="http://www.w3.org/2000/svg">
                                        <polygon points="10,0 4,18 19,6 1,6 16,18" fill="blue" />
                                    </svg> */}
                                </span>
                                ({totalRating})
                            </p>

                            <button onClick={showReviewsHandler}>{showReviews ? 'Hide ' : 'Read'} reviews</button>
                            {showReviews &&
                                <ItemReviews itemId={item._id} />
                            }
                        </>
                    }
                </>
            }
        </div>
    )
}