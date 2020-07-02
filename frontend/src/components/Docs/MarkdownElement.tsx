import React from 'react'

interface IMarkdownElementProps {
    renderedMarkdown: string
}

const MarkdownElement = (props: IMarkdownElementProps) => {
    const { renderedMarkdown } = props
    const rest = { dangerouslySetInnerHTML: { __html: renderedMarkdown } }

    return (
        <div
            className='markdown-body'
            {...rest}
        />
    )
}

export default MarkdownElement
