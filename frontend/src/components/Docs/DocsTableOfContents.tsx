import React from 'react'

import { IDocsTableOfContentsLink } from '../../types/docs'

interface IDocsTableOfContentsProps {
    tableOfContents: IDocsTableOfContentsLink[]
}

class DocsTableOfContents extends React.Component<IDocsTableOfContentsProps> {
    render() {
        return (
            <ul className='docs__toc'>
                {this.props.tableOfContents.map((section: IDocsTableOfContentsLink) => (
                    <li>{section.title}</li>
                ))}
            </ul>
        )
    }
}

export default DocsTableOfContents
