import React from 'react'
import withAuth from '../hocs/withAuth'

const Hello = () => {
    return (
        <div>Hello world!</div>
    )
}

export default withAuth(Hello)
