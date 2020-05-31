import Link from 'next/link'
import React from 'react'
import { NextPageContext } from 'next'

import {
    Typography
} from '@material-ui/core'

interface IErrorPageProps {
    statusCode: number
    withNavigation?: boolean
}

class ErrorPage extends React.Component<IErrorPageProps> {
    static getServersideProps = (context: NextPageContext): Partial<IErrorPageProps> => {
        const { res, err } = context
        const statusCode: number = res ? res.statusCode : err ? err.statusCode : 404
        return { statusCode }
    }

    render() {
        return (
            <div>
                <Typography variant='h3'>_error.tsx: {this.props.statusCode};</Typography>
                {this.props.withNavigation !== true && (
                    <Link href='/'><a>Go to Home Page</a></Link>
                )}
            </div>
        )
    }
}

export default ErrorPage
