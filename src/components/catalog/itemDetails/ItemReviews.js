import { useCallback, useContext, useState } from "react"
import { addLikeByReviewId, removeLikeByReviewId, addItemReviewById, getItemReviewsById } from "../../../data/services/itemService"
import { AuthContext } from "../../common/context/AuthContext"

export const ItemReviews = ({ itemId }) => {
    const { user: { _id } } = useContext(AuthContext)

    const [reviews, setReviews] = useState(null)

    const [newUserReview, setNewUserReview] = useState('')

    const loadReviewsHandler = useCallback(async () => {
        getItemReviewsById()
            .then(setReviews)
    }, [])

    const submitReviewHandler = useCallback(async e => {
        e.preventDefault()
        await addItemReviewById(itemId, newUserReview)
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

    return (
        <>
            <button onClick={loadReviewsHandler}>Read reviews</button>
            {
                reviews &&
                <>
                    {
                        _id &&
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
                            reviews.map(r => <p key={r._id}><b>{r._creator.fname} {r._creator.lname}:</b> {r.text} <span onClick={() => likeHandler(r._id)} style={r.likes.some(l => l._creator === _id) ? { background: 'blue' } : {}}>👍</span>({r.likes.length})</p>)
                        }
                    </div>
                </>
            }
        </>
    )
}