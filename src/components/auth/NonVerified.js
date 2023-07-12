import { useCallback, useContext, useState } from "react"
import { AuthContext } from "../common/context/AuthContext"
import { verify } from "../../data/services/authService"

export const NonVerified = () => {
    const { user: { _id }, setUserData } = useContext(AuthContext)

    const [codeValue, setCodeValue] = useState('')

    const onCodeChangeHandler = useCallback(async e => {
        const value = e.target.value
        setCodeValue(value)
        if (value.length === 4) {
            setUserData(await verify(_id, value))
        }
    }, [_id, setUserData])

    return (
        <div>
            <input type="text" value={codeValue} onChange={onCodeChangeHandler} />
        </div>
    )
}