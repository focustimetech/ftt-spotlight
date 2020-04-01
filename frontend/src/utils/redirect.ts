import { NextPageContext } from 'next'
import Router from 'next/router'

const redirect = (context: NextPageContext, target: string) => {
    if (context.res) {
        context.res.writeHead(303, { Location: target })
        context.res.end()
        return
    }

    Router.replace(target)
}

export default redirect
