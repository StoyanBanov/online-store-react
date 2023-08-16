import { post } from "../api";

const endpoint = 'http://ee.econt.com/services/Nomenclatures/NomenclaturesService'

export function getCities() {
    return post(endpoint + '.getCities.json', {
        "countryCode": "BGR"
    }, true)
}

export function getOffices(cityId) {
    return post(endpoint + '.getOffices.json', {
        "countryCode": "BGR",
        "cityID": cityId
    }, true)
}