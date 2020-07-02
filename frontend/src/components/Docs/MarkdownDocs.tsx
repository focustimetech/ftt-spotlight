import { NextPage } from 'next'
import React from 'react'

import { Typography } from '@material-ui/core'

import { IDocsTableOfContentsLink } from '../../types/docs'
import { prepareMarkdown } from '../../utils/docs'

import Flexbox from '../Layout/Flexbox'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutContent from '../Layout/LayoutContent'
import Section from '../Layout/Section'
import HorizontalNav from '../Nav/HorizontalNav'
import DocsCatalog from './DocsCatalog'
import DocsTableOfContents from './DocsTableOfContents'
import MarkdownElement from './MarkdownElement'

interface IMarkdownDocsProps {
    renderedMarkdown: string
    tableOfContents: IDocsTableOfContentsLink[]
}

export const getMarkdownDocsLayout = ({ children }) => {
    return (
        <LayoutContainer orientation='horizontal'>
            <HorizontalNav />
            <LayoutContent orientation='horizontal'>
                <Section>
                    <Flexbox className='docs' alignItems='flex-start'>
                        <aside className='docs__menu'>
                            <DocsCatalog />
                        </aside>
                        {children}
                    </Flexbox>
                </Section>
            </LayoutContent>
        </LayoutContainer>
    )
}

const MarkdownDocs = (props: IMarkdownDocsProps) => {
    const { renderedMarkdown, tableOfContents } = props

    return (
        <>
            <div className='docs__content'>
                <MarkdownElement renderedMarkdown={renderedMarkdown} />
            </div>
            <div className='docs__overview'>
                <Typography variant='h6'>On This Page</Typography>
                <DocsTableOfContents tableOfContents={tableOfContents} />
            </div>
        </>
    )
}

export default MarkdownDocs
