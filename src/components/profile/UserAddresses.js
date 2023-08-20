import { useOutletContext } from "react-router-dom"
import { AddressForm } from "./AddressForm"

export const UserAddresses = () => {
    const userData = useOutletContext()

    return (
        <div>
            {userData &&
                <>
                    {
                        userData.address &&
                        <AddressForm address={userData.address} />
                    }

                    {userData.secondAddress &&
                        <AddressForm address={userData.secondAddress} />
                    }

                    {(!userData.address || !userData.secondAddress) &&
                        <>
                            <h2>Add {userData.address ? 'second' : ''} address</h2>
                            <AddressForm />
                        </>
                    }
                </>
            }
        </div>
    )
}