import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../common/context/AuthContext"

import style from './style.module.css'

export const CategoryCard = ({ cat }) => {
    const { user: { roles } } = useContext(AuthContext)

    const navigate = useNavigate()

    const editHandler = useCallback(() => {
        navigate(`/admin/edit/category/${cat._id}`)
    }, [navigate, cat])

    const deleteHandler = useCallback(() => {
    }, [cat])

    const catDetailsHandler = useCallback(e => {
        if (e.target.tagName !== 'BUTTON')
            navigate(`/catalog/${cat.title}/${cat._id}`)
    }, [navigate, cat])

    return (
        <div className={style.categoryContainer} onClick={catDetailsHandler}>
            <div>
                {cat.thumbnail &&
                    <img src={`http://localhost:3030/static/images/${cat.thumbnail}`} alt={cat.title} />
                }
            </div>

            <h2>{cat.title}</h2>

            {roles?.includes('admin') &&
                <div>
                    <button onClick={editHandler}>Edit</button>
                    <button onClick={deleteHandler}>Delete</button>
                </div>
            }
        </div>
    )
}