import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const CategoryCard = ({ cat }) => {
    const navigate = useNavigate()

    const editClickHandler = useCallback(() => {
        navigate(`/admin/edit/category/${cat._id}`)
    }, [navigate, cat])

    return (
        <div>
            {cat.thumbnail &&
                <img height={200} src={`http://localhost:3030/static/images/${cat.thumbnail}`} alt={cat.title} />
            }
            <h2>{cat.title}</h2>
            <div>
                <button onClick={editClickHandler}>Edit</button>
            </div>
        </div>
    )
}