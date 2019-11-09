import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { Button } from '@material-ui/core'

import { EmptyStateIcon } from '../EmptyStateIcon'

interface IProps extends RouteComponentProps {
    path?: string
}

export const NotFound = (props: IProps) => {
    return (
        <div className='content' id='content'>
            <div className='not-found'>
                <EmptyStateIcon variant='not-found'>
                    <h2>No match for <code>{props.path || props.location.pathname}</code></h2>
                    <h3>The item you're looking for may have been moved, renamed or deleted.</h3>
                    <Link to='/'><Button variant='contained' color='primary'>Back to Dashboard</Button></Link>
                </EmptyStateIcon>
            </div>
        </div>
    )
}
