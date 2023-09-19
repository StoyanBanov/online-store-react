export const PurchaseAddress = ({ savedAddressChangeHandler, changeAddressValueHandler, userData, address }) => {
    return (
        <>
            {userData.address &&
                <div>
                    <label>Saved Addresses</label>
                    <select name="address" onChange={savedAddressChangeHandler}>
                        <option></option>
                        <option>{userData.address.street}...</option>
                        {userData.secondAddress &&
                            <option name="secondAddress">{userData.secondAddress.street}...</option>
                        }
                    </select>
                </div>
            }

            <div>
                <label htmlFor="inputStreet">Street</label>
                <input id="inputStreet" name="street" value={address.street} onChange={changeAddressValueHandler} required />
            </div>

            <div>
                <label htmlFor="inputCity">City</label>
                <input id="inputCity" name="city" value={address.city} onChange={changeAddressValueHandler} required />
            </div>

            <div>
                <label htmlFor="inputZIPCode">ZIP Code</label>
                <input id="inputZIPCode" name="zipCode" value={address.zipCode} onChange={changeAddressValueHandler} required />
            </div>

            <div>
                <label htmlFor="inputCounty">County</label>
                <input id="inputCounty" name="county" value={address.county} onChange={changeAddressValueHandler} required />
            </div>

            <div>
                <label htmlFor="inputCountry">Country</label>
                <input id="inputCountry" name="country" value={address.country} onChange={changeAddressValueHandler} required />
            </div>
        </>
    )
}