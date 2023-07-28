import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../common/context/AuthContext"

export const CategoryCard = ({ cat }) => {
    const { user: { roles } } = useContext(AuthContext)

    const navigate = useNavigate()

    const editClickHandler = useCallback(() => {
        navigate(`/admin/edit/category/${cat._id}`)
    }, [navigate, cat])

    const catDetailsHandler = useCallback(() => {
        navigate(`/catalog/${cat.title}/${cat._id}`)
    }, [navigate, cat])

    return (
        <div>
            {cat.thumbnail &&
                <img height={200} src={`http://localhost:3030/static/images/${cat.thumbnail}`} alt={cat.title} />
            }
            <h2 onClick={catDetailsHandler}>{cat.title}</h2>
            {roles?.includes('admin') &&
                <div>
                    <button onClick={editClickHandler}>Edit</button>
                    <button onClick={editClickHandler}>Delete</button>
                </div>
            }
        </div>
    )
}