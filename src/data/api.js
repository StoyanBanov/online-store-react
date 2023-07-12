const host = 'http://localhost:3030'

async function request(method, url, body, json = false) {
    const response = await fetch(host + url, createOptions(method, body, json))
    if (!response.ok) throw new Error()

    try {
        return await response.json()
    } catch (error) {
        return response
    }
}

function createOptions(method, body, json) {
    const options = {
        method,
        headers: {}
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