import { useCallback, useRef, useState } from 'react'
import { registerRules } from './registerInputRules'
import style from './style.module.css'
import { register } from '../../data/services/authService'

export const Register = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        'repeat-password': ''
    })

    const [errors, setErrors] = useState({
        password: false,
        'repeat-password': false
    })

    const onValueChangeHandler = useCallback(e => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
        if (e.target.name === 'password') {
            setErrors(state => ({ ...state, [e.target.name]: e.target.value.length < 8 }))
        }
    }, [])

    const passwordRulesRef = useRef()

    const showRulesHandler = useCallback(() => {
        passwordRulesRef.current.style.display = 'block'
    }, [])

    const hideRulesHandler = useCallback(() => {
        passwordRulesRef.current.style.display = 'none'
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        register(JSON.stringify(values))
    }

    return (
        <div className={style.authContainer}>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="user-email"><span>*</span>email</label>
                    <input type="email" id="user-email" name='email' value={values.email} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="user-password"><span>*</span>password</label>
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
                    <p ref={passwordRulesRef} className={style.inputRules}>
                        {registerRules.password}
                    </p>
                </div>

                <div>
                    <label htmlFor="user-repeat-pass"><span>*</span>repeat password</label>
                    <input type="password" id="user-repeat-pass" name='repeat-password' value={values['repeat-password']} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="user-fname"><span>*</span>first name</label>
                    <input id="user-fname" name='fname' value={values.fname} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="user-lname"><span>*</span>last name</label>
                    <input id="user-lname" name='lname' value={values.lname} onChange={onValueChangeHandler} />
                </div>

                <div>
                    <label htmlFor="user-phone">phone</label>
                    <input id="user-phone" name='phone' value={values.phone} onChange={onValueChangeHandler} />
                </div>

                <p>fields marked with <span>*</span> are required</p>

                <button type='submit'>Register</button>
            </form>
        </div>
    )
}