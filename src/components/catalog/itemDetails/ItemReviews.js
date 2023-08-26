import { useCallback, useContext, useEffect, useState } from "react"
import { addLikeByReviewId, removeLikeByReviewId, addItemReviewById, getItemReviewsById } from "../../../data/services/itemService"
import { AuthContext } from "../../common/context/AuthContext"

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
        if (reviews.find(r => r._id === id).likes.some(l => l._creator === _id)) {
            await removeLikeByReviewId(id)
            setReviews(state => {
                const review = state.find(r => r._id === id)
                const reviewIndex = state.indexOf(review)
                return [
                    ...state.slice(0, reviewIndex),
                    { ...review, likes: review.likes.filter(l => l._creator !== _id) },
                    ...state.slice(reviewIndex + 1)
                ]
            })
        } else {
            await addLikeByReviewId(id)
            setReviews(state => {
                const review = state.find(r => r._id === id)
                const reviewIndex = state.indexOf(review)
                return [
                    ...state.slice(0, reviewIndex),
                    { ...review, likes: [...review.likes, { _creator: _id }] },
                    ...state.slice(reviewIndex + 1)
                ]
            })
        }

    }, [reviews, _id])

    const changePageHandler = useCallback(e => {
        setPage(Number(e.target.textContent))
    }, [])

    return (
        <>
            {
                reviews.length > 0 &&
                <>
                    {
                        (_id && page === 1) &&
                        <div>
                            <span>{reviews.length ? 'Leave a review' : 'Leave the first review'}</span>
                            <form onSubmit={submitReviewHandler}>
                                <label htmlFor='reviewTextArea'>Review</label>
                                <textarea rows={4} placeholder='My review...' value={newUserReview} onChange={e => setNewUserReview(e.target.value)} />
                                <button>Send</button>
                            </form>
                        </div>
                    }
                    <div>
                        {
                            reviews.map(r =>
                                <div style={{ wordBreak: 'break-word', background: 'white', padding: '1vw', borderRadius: '4px', marginTop: '1vh' }} key={r._id}>
                                    <b>
                                        {r._creator._id === _id
                                            ? 'you: '
                                            : `${r._creator.fname} ${r._creator.lname}: `
                                        }
                                    </b>

                                    <div>
                                        <span>{r.text}</span>
                                    </div>

                                    <div>
                                        <span onClick={() => likeHandler(r._id)} style={r.likes.some(l => l._creator === _id) ? { background: 'blue' } : {}}>👍</span>
                                        ({r.likes.length})
                                    </div>
                                </div>
                            )
                        }

                        <div>
                            {page > 2 &&
                                <>
                                    <span onClick={changePageHandler}>{page - 2}</span>
                                    <span> ... </span>
                                </>
                            }

                            {page > 1 &&
                                <span onClick={changePageHandler}>{page - 1}</span>
                            }

                            <span onClick={changePageHandler}><strong>{page}</strong></span>

                            {totalPages > page &&
                                <span onClick={changePageHandler}>{page + 1}</span>
                            }

                            {totalPages > page + 1 &&
                                <>
                                    <span> ... </span>
                                    <span onClick={changePageHandler}>{totalPages}</span>
                                </>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}