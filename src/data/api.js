const host = 'http://localhost:3030'

async function request(method, url, body, json = false) {
    try {
        const response = await fetch(host + url, createOptions(method, body, json))
        if (!response.ok) throw new Error((await response.json()).message)

        try {
            return await response.json()
        } catch (error) {
            return response
        }
    } catch (error) {
        window.alert(error)
        throw error
    }
}

function createOptions(method, body, json) {
    const options = {
        method,
        headers: {}
    }

    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user && user.accessToken) {
        options.headers['Authorization'] = user.accessToken
    }

    if (json && body) {
        options.headers['Content-Type'] = 'application/json'
        body = JSON.stringify(body)
    }

    if (body) {
        options.body = body
    }

    return options
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')