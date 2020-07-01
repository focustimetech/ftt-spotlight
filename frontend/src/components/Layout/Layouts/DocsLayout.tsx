import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'

import {
    Typography
} from '@material-ui/core'

import {
    TreeItem,
    TreeView
} from '@material-ui/lab'

import { IUser } from '../../../types/auth'
import { ILayoutContainerProps } from '../../../types/layout'

import HorizontalNav from '../../Nav/HorizontalNav'
import Flexbox from '../Flexbox'
import LayoutContainer from '../LayoutContainer'
import LayoutContent from '../LayoutContent'
import Section from '../Section'

interface IDocumentationArticle {
    type: 'article'
    title: string
    slug: string
}

interface IDocumentationGroup {
    type: 'group'
    title: string
    slug: string
    children: DocumentationItem[]
}

type DocumentationItem = IDocumentationGroup | IDocumentationArticle

const studentDocs: DocumentationItem[] = [
    { type: 'article', title: 'Getting Started', slug: 'getting-started' }
]

const teacherDocs: DocumentationItem[] = [
    { type: 'article', title: 'Getting Started', slug: 'getting-started' },
    {
        type: 'group',
        title: 'Student Check-in',
        slug: 'check-in',
        children: [
            { type: 'article', title: 'Student Entry', slug: 'student-entry' },
        ]
    }
]

const renderDocumentation = (items: DocumentationItem[], parentSlug: string = null) => {
    return items.map((item: DocumentationItem) => {
        const slug: string = parentSlug ? `${parentSlug}/${item.slug}` : item.slug
        if (item.type === 'article') {
            return (
                <Link href={slug}>
                    <a href={slug}>
                        <TreeItem nodeId={slug} label={item.title} />
                    </a>
                </Link>
            )
        } else {
            return (
                <TreeItem nodeId={slug} label={item.title}>
                    {renderDocumentation(item.children, slug)}
                </TreeItem>
            )
        }
    })
}

interface IDocsLayoutProps extends ILayoutContainerProps {
    currentUser: IUser
}

class DocsLayout extends React.Component<IDocsLayoutProps> {
    render() {
        return (
            <LayoutContainer orientation='horizontal'>
                <HorizontalNav />
                <LayoutContent orientation='horizontal'>
                    <Section>
                        <Flexbox className='docs' alignItems='flex-start'>
                            <aside className='docs__menu'>
                                <Typography variant='h6'>Students</Typography>
                                <TreeView>
                                    {renderDocumentation(studentDocs, 'docs/students')}
                                </TreeView>
                                {['sysadmin', 'teacher', 'staff'].includes(this.props.currentUser.accountType) && (
                                    <>
                                        <Typography variant='h6'>Teachers</Typography>
                                        <TreeView>
                                            {renderDocumentation(teacherDocs, 'docs/teachers')}
                                        </TreeView>
                                    </>
                                )}
                            </aside>
                            <div className='docs__content'>
                                {this.props.children}
                            </div>
                            <div className='docs__overview'>
                                <p>On this page...</p>
                            </div>
                        </Flexbox>
                    </Section>
                </LayoutContent>
            </LayoutContainer>
        )
    }
}

export const getLayout = (page: NextPage) => <DocsLayout>{page}</DocsLayout>

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user
})

export default connect(mapStateToProps, null)(DocsLayout)
