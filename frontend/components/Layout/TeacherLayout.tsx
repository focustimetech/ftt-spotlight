import classNames from 'classnames'
import React from 'react'

import { ILayoutProps } from '../../types/layout'
import { staffMenuItems } from './StaffLayout'

import LayoutContainer from './LayoutContainer'
import { INavMenuItem } from '../Nav/NavMenuItem'
import VerticalNav from '../Nav/VerticalNav'
import LayoutContent from './LayoutContent'

const teacherMenuItems: INavMenuItem[] = [
    { label: 'Student Check-in', href: 'check-in', icon: 'how_to_vote' },
    { label: 'Clusters', href: 'clusters', icon: 'group' }
]

const clusters: INavMenuItem[] = [
    { label: 'Advisory 27', href: 'clusters/2', icon: 'group' }
]

class TeacherLayout extends React.Component<ILayoutProps> {
    render() {
        return (
            <LayoutContainer orientation='vertical'>
                <VerticalNav menuItems={[...teacherMenuItems, ...staffMenuItems]} hiddenMenuItems={clusters} />
                <LayoutContent orientation='vertical'>
                    {this.props.children}
                </LayoutContent>
            </LayoutContainer>
        )
    }
}

export default TeacherLayout
