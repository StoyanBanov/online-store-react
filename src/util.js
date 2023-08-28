export function trimText(text, maxWidth) {
    return text.substring(0, maxWidth - 3) + (text.length >= maxWidth ? '...' : '')
}

export function makePages(current, total) {
    const pages = []
    if (current > 2) pages.push(1, ' ... ')

    if (current > 1) pages.push(current - 1)

    pages.push(current)

    if (current < total) pages.push(current + 1)

    if (current < total - 1) pages.push(' ... ', total)

    return pages
}