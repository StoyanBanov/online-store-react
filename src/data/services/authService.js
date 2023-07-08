import { post } from "../api"

const endpoints = {
    login: 'auth/login',
    register: 'auth/register'
}

export async function login(userData) {
    return post(endpoints.login, userData)
}

export async function register(userData) {
    return post(endpoints.register, userData)
}

export async function logout() {
    //TODO
}