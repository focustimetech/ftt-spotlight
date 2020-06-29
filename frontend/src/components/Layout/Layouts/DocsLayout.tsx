import { NextPage } from 'next'
import React from 'react'

import {
    Typography
} from '@material-ui/core'

import {
    TreeItem,
    TreeView
} from '@material-ui/lab'

import { ILayoutContainerProps } from '../../../types/layout'

import HorizontalNav from '../../Nav/HorizontalNav'
import Flexbox from '../Flexbox'
import LayoutContainer from '../LayoutContainer'
import LayoutContent from '../LayoutContent'
import Section from '../Section'

const DocsLayout = (props: ILayoutContainerProps) => {
    return (
        <LayoutContainer orientation='horizontal'>
            <HorizontalNav />
            <LayoutContent orientation='horizontal'>
                <Section>
                    <Flexbox className='docs' alignItems='flex-start'>
                        <aside className='docs__menu'>
                            <Typography variant='h6'>Section 1</Typography>
                            <TreeView>
                                <TreeItem nodeId='1' label='Article 1' />
                            </TreeView>
                            <Typography variant='h6'>Section 1</Typography>
                            <TreeView>
                                <TreeItem nodeId='1' label='Article 1' />
                            </TreeView>
                        </aside>
                        <div className='docs__content'>
                            {props.children}
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

export const getLayout = (page: NextPage) => <DocsLayout>{page}</DocsLayout>

export default DocsLayout
