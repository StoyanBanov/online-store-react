import { useCallback, useContext, useEffect, useState } from "react"
import { addLikeByReviewId, removeLikeByReviewId, addItemReviewById, getItemReviewsById } from "../../../data/services/itemService"
import { AuthContext } from "../../common/context/AuthContext"
import { PaginationPages } from "../../common/helpers/PaginationPages"

import style from './style.module.css'

export const ItemReviews = ({ itemId }) => {
    const { user: { _id } } = useContext(AuthContext)

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const [reviews, setReviews] = useState([])

    const [newUserReview, setNewUserReview] = useState('')

    useEffect(() => {
        getItemReviewsById({ item: itemId, itemsPerPage: 2, page })
            .then(setReviews)
        getItemReviewsById({ item: itemId, count: true })
            .then(count => setTotalPages(Math.ceil(count / 2)))
    }, [itemId, page])

    const submitReviewHandler = useCallback(async e => {
        e.preventDefault()

        const newReview = await addItemReviewById(itemId, newUserReview)
        setReviews(state => [{ ...newReview, _creator: { _id: newReview._creator } }, ...state])

        setNewUserReview('')
    }, [itemId, newUserReview])

    const likeHandler = useCallback(async id => {
        const hasLike = reviews.find(r => r._id === id).likes.some(l => l._creator === _id)
        await hasLike ? removeLikeByReviewId(id) : addLikeByReviewId(id)

        setReviews(state => {
            const review = state.find(r => r._id === id)
            const reviewIndex = state.indexOf(review)
            const updatedReview = {
                ...review,
                likes: hasLike
                    ? review.likes.filter(l => l._creator !== _id)
                    : [...review.likes, { _creator: _id }]
            }

            return [
                ...state.slice(0, reviewIndex),
                updatedReview,
                ...state.slice(reviewIndex + 1)
            ]
        })

    }, [reviews, _id])

    const changePageHandler = useCallback(e => {
        setPage(Number(e.target.textContent))
    }, [])

    return (
        <div className={style.reviewsContainer}>
            <>
                {(_id && page === 1) &&
                    <div>
                        <span>{reviews.length ? 'Leave a review' : 'Leave the first review'}</span>
                        <form onSubmit={submitReviewHandler}>
                            <label htmlFor='reviewTextArea'>Review</label>
                            <textarea rows={4} placeholder='My review...' value={newUserReview} onChange={e => setNewUserReview(e.target.value)} />
                            <button>Send</button>
                        </form>
                    </div>
                }

                {reviews.length > 0 &&
                    <div>
                        {
                            reviews.map(r =>
                                <div className={style.reviewContainer} key={r._id}>
                                    <b>
                                        {r._creator._id === _id
                                            ? 'You: '
                                            : `${r._creator.fname} ${r._creator.lname}: `
                                        }
                                    </b>

                                    <div>
                                        <span>{r.text}</span>
                                    </div>

                                    <div>
                                        {_id
                                            ? <span className={style.likeButton} onClick={() => likeHandler(r._id)} style={r.likes.some(l => l._creator === _id) ? { background: 'blue' } : {}}>👍</span>
                                            : <span>👍</span>
                                        }
                                        ({r.likes.length})
                                    </div>
                                </div>
                            )
                        }

                        <div>
                            <PaginationPages
                                currentPage={page}
                                totalPages={totalPages}
                                pageWrap={({ children }) => <span className={style.page} onClick={changePageHandler}>{children}</span>}
                            />
                        </div>
                    </div>
                }
            </>
        </div>
    )
}