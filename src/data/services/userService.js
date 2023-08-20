import * as api from "../api";

const endpoint = '/user'

export async function getUserData() {
    return api.get(`${endpoint}`)
}