export function trimText(text, maxWidth) {
    return text.substring(0, maxWidth - 3) + (text.length >= maxWidth ? '...' : '')
}