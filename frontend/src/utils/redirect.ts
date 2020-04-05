import { NextPageContext } from 'next'
import Router from 'next/router'

/**
 * Redirects the user to the given target path.
 * @param target The target path.
 * @param context The NextPageContext on the server (optional).
 */
const redirect = (target: string, context?: NextPageContext) => {
    if (context && context.res) {
        context.res.writeHead(303, { Location: target })
        context.res.end()
        return
    }

    Router.replace(target)
}

export default redirect
