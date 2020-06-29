import React from 'react'

import { ILayoutContainerProps } from '../../../types/layout'

import LayoutContainer from '../LayoutContainer'
import LayoutContent from '../../Layout/LayoutContent'
import HorizontalNav from '../../Nav/HorizontalNav'

class StudentLayout extends React.Component<ILayoutContainerProps> {
    render() {
        return (
            <LayoutContainer orientation='horizontal'>
                <HorizontalNav hasFavorites />
                <LayoutContent orientation='horizontal'>
                    {this.props.children}
                </LayoutContent>
            </LayoutContainer>
        )
    }
}

export default StudentLayout
