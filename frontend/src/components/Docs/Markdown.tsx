import Link from 'next/link'
import React from 'react'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown/with-html'

import { Divider } from '@material-ui/core'
import Typography, { TypographyProps } from '@material-ui/core/Typography'

const Markdown = (props: ReactMarkdownProps) => {
    const { renderers, ...rest } = props

    return (
        <ReactMarkdown
            {...rest}
            renderers={{
                // text: ({ children }) => <Typography>{children}</Typography>,
                paragraph: ({ children }) => <Typography variant='body1'>{children}</Typography>,
                link: ({ children, href }) => <Link href={href}><a href={href}><Typography variant='inherit'>{children}</Typography></a></Link>,
                heading: ({ level, children}) => <Typography className='docs__heading' variant={`h${level}` as TypographyProps['variant']}>{children}</Typography>,
                thematicBreak: Divider
            }}
        />
    )
}

export default Markdown
