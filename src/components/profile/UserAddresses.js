import { useOutletContext } from "react-router-dom"
import { AddressForm } from "./AddressForm"

export const UserAddresses = () => {
    const { userData: { address, secondAddress }, changeUserData } = useOutletContext()

    return (
        <div>
            {address &&
                <AddressForm address={address} changeUserData={changeUserData.bind(null, 'address')} />
            }

            {secondAddress &&
                <AddressForm address={secondAddress} changeUserData={changeUserData.bind(null, 'secondAddress')} />
            }

            {(!address || !secondAddress) &&
                <>
                    <h2>Add {address ? 'second' : ''} address</h2>
                    <AddressForm changeUserData={changeUserData.bind(null, (address ? 'secondAddress' : 'address'))} />
                </>
            }
        </div>
    )
}