import React from 'react'
import { NextPageContext } from 'next'

interface IErrorPageProps {
    statusCode: number
}

class ErrorPage extends React.Component<IErrorPageProps> {
    static getInitialProps = (context: NextPageContext): Partial<IErrorPageProps> => {
        const { res, err } = context
        const statusCode: number = res ? res.statusCode : err ? err.statusCode : 404
        return { statusCode }
    }

    render() {
        console.log('props:', this.props)
        return <div>Oh no! An error {this.props.statusCode} occured.</div>
    }
}

export default ErrorPage
