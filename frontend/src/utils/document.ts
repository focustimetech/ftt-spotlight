export const makeDocumentTitle = (title: string) => {
    return `${title} – Spotlight`
}

export const truncate = (value: string, maxLength: number) => {
    return value.length  <= maxLength
        ? value
        : `${value.substr(0, maxLength - 3)}...`
}
