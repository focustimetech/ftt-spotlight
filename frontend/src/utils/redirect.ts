import { NextPageContext } from 'next'
import Router from 'next/router'

/**
 * Redirects the user to the given target path.
 * @param target The target path.
 * @param context The NextPageContext on the server (optional).
 * @param code The error code, e.g. 401.
 */
const redirect = (target: string, context?: NextPageContext, code?: number) => {
    if (typeof window === 'undefined') {
        context.res.writeHead(code || 303, { Location: target })
        context.res.end()
        return
    }

    Router.replace(target)
    console.log(`Router.replace(${target})`)
}

export default redirect
