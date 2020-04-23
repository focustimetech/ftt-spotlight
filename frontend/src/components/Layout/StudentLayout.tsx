import React from 'react'

import { ILayoutProps } from '../../types/layout'

import Layout from '.'
import LayoutContent from '../Layout/LayoutContent'
import HorizontalNav from '../Nav/HorizontalNav'

class StudentLayout extends React.Component<ILayoutProps> {
    render() {
        return (
            <Layout orientation='horizontal'>
                <HorizontalNav hasFavorites />
                <LayoutContent orientation='horizontal'>
                    {this.props.children}
                </LayoutContent>
            </Layout>
        )
    }
}

export default StudentLayout
