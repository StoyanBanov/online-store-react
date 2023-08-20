import { useOutletContext } from "react-router-dom"

export const UserData = () => {
    const userData = useOutletContext()

    return (
        <div>
            {userData &&
                <form>
                    <div>
                        <div>
                            <label htmlFor="user-email">email</label>
                            <input type="email" id="user-email" name='email' value={userData.email} />
                        </div>

                        <div>
                            <label htmlFor="user-fname">first name</label>
                            <input type='text' id="user-fname" name='fname' value={userData.fname} />
                        </div>

                        <div>
                            <label htmlFor="user-lname">last name</label>
                            <input type='text' id="user-lname" name='lname' value={userData.lname} />
                        </div>

                        <div>
                            <label htmlFor="user-phone">phone</label>
                            <input type='text' id="user-phone" name='phone' value={userData.phone} />
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}