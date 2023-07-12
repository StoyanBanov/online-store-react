import { useCallback, useContext, useRef, useState } from 'react'
import { registerRules } from './registerInputRules'
import style from './style.module.css'
import { register } from '../../data/services/authService'
import { AuthContext } from '../common/context/AuthContext'

export const Register = () => {

    const { setUserData } = useContext(AuthContext)

    const [values, setValues] = useState({
        email: '',
        password: '',
        'repeat-password': '',
        fname: '',
        lname: '',
        phone: ''
    })

    const [errors, setErrors] = useState({
        password: false,
        'repeat-password': false
    })

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
        if (e.target.name === 'password') {
            setErrors(state => ({ ...state, [e.target.name]: e.target.value.length < 10 || e.target.value.length > 10 }))
        }
    }, [])

    const passwordRulesRef = useRef()

    const showRulesHandler = useCallback(() => {
        passwordRulesRef.current.style.display = 'block'
    }, [])

    const hideRulesHandler = useCallback(() => {
        passwordRulesRef.current.style.display = 'none'
    }, [])

    const submitHandler = async e => {
        e.preventDefault()
        setUserData(await register(values))
    }

    return (
        <div className={style.authContainer}>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <div>
                        <label htmlFor="user-email">email<span>*</span></label>
                        <input type="email" id="user-email" name='email' value={values.email} onChange={onValueChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="user-password">password<span>*</span></label>
                        <input
                            className={errors.password ? style.errorInput : ''}
                            type="password"
                            id="user-password"
                            name='password'
                            value={values.password}
                            onChange={onValueChangeHandler}
                            onFocus={showRulesHandler}
                            onBlur={hideRulesHandler}
                        />
                    </div>

                    <div>
                        <p ref={passwordRulesRef} className={style.inputRules}>
                            {registerRules.password}
                        </p>
                    </div>

                    <div>
                        <label htmlFor="user-repeat-pass">repeat password<span>*</span></label>
                        <input type="password" id="user-repeat-pass" name='repeat-password' value={values['repeat-password']} onChange={onValueChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="user-fname">first name<span>*</span></label>
                        <input type='text' id="user-fname" name='fname' value={values.fname} onChange={onValueChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="user-lname">last name<span>*</span></label>
                        <input type='text' id="user-lname" name='lname' value={values.lname} onChange={onValueChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="user-phone">phone</label>
                        <input type='text' id="user-phone" name='phone' value={values.phone} onChange={onValueChangeHandler} />
                    </div>
                </div>

                <p>fields marked with <span>*</span> are required</p>

                <button type='submit'>Register</button>
            </form>
        </div>
    )
}