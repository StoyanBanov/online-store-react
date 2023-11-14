import { post } from "../api"

const root = '/auth'

const endpoints = {
    login: `${root}/login`,
    register: `${root}/register`,
    verify: `${root}/verify`
}

export async function login(userData) {
    return post(endpoints.login, userData, true)
}

export async function register(userData) {
    return post(endpoints.register, userData, true)
}

export async function verify(userId, code) {
    return post(endpoints.verify, { userId, code }, true)
}