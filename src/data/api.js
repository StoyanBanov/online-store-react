async function request(method, url, body) {
    const response = await fetch(url, createOptions(method, body))
    if (!response.ok) throw new Error()

    try {
        return await response.json()
    } catch (error) {
        return response
    }
}

function createOptions(method, body) {
    const options = {
        method,
        headers: {}
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }

    return options
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')