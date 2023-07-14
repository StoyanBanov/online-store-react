import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getItemById } from '../../data/services/itemService'

import { AuthContext } from '../common/context/AuthContext'

export const ItemDetails = () => {
    const { user: { roles } } = useContext(AuthContext)

    const { itemId } = useParams()

    const [item, setItem] = useState({})

    useEffect(() => {
        getItemById(itemId)
            .then(setItem)
    }, [itemId])

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
                </>
            }
        </div>
    )
}