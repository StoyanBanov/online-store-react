import { post } from "../api"

const endpoints = {
    login: 'auth/login',
    register: 'auth/register'
}

async function login(userData) {
    return post(endpoints.login, userData)
}

async function register(userData) {
    return post(endpoints.register, userData)
}