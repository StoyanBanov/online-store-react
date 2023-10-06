export function parseWhere(req) {
    return Object.fromEntries(req.url.searchParams.get('where').split('&').map(q => q.split('=').map((a, i) => i === 1 ? JSON.parse(a) : a)))
}