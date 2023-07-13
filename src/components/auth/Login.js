import { useCallback, useContext, useState } from 'react'
import style from './style.module.css'
import { login } from '../../data/services/authService'
import { AuthContext } from '../common/context/AuthContext'

export const Login = () => {

    const { setUserData } = useContext(AuthContext)

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [])

    const submitHandler = async e => {
        e.preventDefault()
        setUserData(await login(values))
    }

    return (
        <div className={style.authContainer}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <div>
                        <label htmlFor="user-email">email</label>
                        <input type="email" id="user-email" name='email' value={values.email} onChange={onValueChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="user-password">password</label>
                        <input
                            type="password"
                            id="user-password"
                            name='password'
                            value={values.password}
                            onChange={onValueChangeHandler}
                        />
                    </div>
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}