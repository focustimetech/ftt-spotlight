const cookieParser = (cookieString: string): Record<string, string> => {
    if (!cookieString) {
        return {}
    }
    const cookies: Record<string, string> = {}
    cookieString.split(';').forEach((cookie: string) => {
        const keyValue: string[] = cookie.trim().split('=')
        cookies[keyValue[0]] = keyValue[1]
    })

    return cookies
}

export default cookieParser
