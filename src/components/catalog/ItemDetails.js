import { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getItemById } from '../../data/services/itemService'

import { AuthContext } from '../common/context/AuthContext'

import style from './style.module.css'

export const ItemDetails = () => {
    const { user: { roles } } = useContext(AuthContext)

    const { itemId } = useParams()

    const [item, setItem] = useState({})

    useEffect(() => {
        getItemById(itemId)
            .then(i => {
                i.rating = 3 //test
                setItem(i)
            })
    }, [itemId])

    const ratingStarMouseOverHandler = useCallback(e => {
        Array.from(e.currentTarget.children)
            .slice(item.rating, Number(e.target.id) + 1)
            .forEach(r => {
                if (e.type === 'mouseover') r.textContent = '★'
                else r.textContent = '☆'
            })
    }, [item.rating])

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
                                <span onMouseOver={ratingStarMouseOverHandler} onMouseOut={ratingStarMouseOverHandler}>
                                    {
                                        ('★'.repeat(item.rating) + '☆'.repeat(5 - item.rating))
                                            .split('')
                                            .map((r, i) => <span id={i} key={i} className={style.ratingStar}>{r}</span>)
                                    }
                                </span>
                            </p>
                        </>
                    }
                </>
            }
        </div>
    )
}