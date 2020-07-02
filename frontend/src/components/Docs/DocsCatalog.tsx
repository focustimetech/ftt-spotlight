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

import { IUser } from '../../types/auth'
import { IDocsCatalogItem } from '../../types/docs'

interface IReduxProps {
    currentUser: IUser
}

const studentDocs: IDocsCatalogItem[] = [
    { type: 'article', title: 'Getting Started', slug: 'getting-started' }
]

const teacherDocs: IDocsCatalogItem[] = [
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

const renderDocumentation = (items: IDocsCatalogItem[], parentSlug: string = '') => {
    return items.map((item: IDocsCatalogItem) => {
        const slug: string = `${parentSlug}/${item.slug}`
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

class DocsCatalog extends React.Component<IReduxProps> {
    render() {
        return (
            <>
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
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user
})

export default connect(mapStateToProps, null)(DocsCatalog)
