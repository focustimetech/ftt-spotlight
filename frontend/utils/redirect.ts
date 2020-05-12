import { NextPageContext } from 'next'
import Router from 'next/router'

type RedirectionCode = 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308

/**
 * Redirects the user to the given target path.
 * @param target The target path.
 * @param context The NextPageContext on the server (optional).
 * @param code The error code, e.g. 303.
 */
const redirect = (target: string, context?: NextPageContext, code?: RedirectionCode) => {
    if (typeof window === 'undefined') {
        context.res.writeHead(code || 303, { Location: target })
        context.res.end()
        return
    }

    Router.replace(target)
}

export default redirect
