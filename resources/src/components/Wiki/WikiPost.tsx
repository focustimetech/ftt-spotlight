import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { Typography } from '@material-ui/core'

import { IBlogPost } from '../../types/wiki'

interface IProps {
    post: IBlogPost
}

const renderers: Record<string, (props: any) => any> = {
    link: (props: any) => <Link to={props.href}>{props.children}</Link>
}

class WikiPost extends React.Component<IProps> {
    render() {
        return (
            <div>
                <Typography variant='h3'>{this.props.post.title}</Typography>
                <ReactMarkdown
                    source={this.props.post.body}
                    renderers={renderers}
                />
            </div>
        )
    }
}

export default WikiPost
