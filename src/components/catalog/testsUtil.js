export function parseWhere(req) {
    return req.url.searchParams.get('where')
        ? Object.fromEntries(req.url.searchParams.get('where').split('&').map(q => q.split('=').map((a, i) => i === 1 ? JSON.parse(a) : a)))
        : {}
}