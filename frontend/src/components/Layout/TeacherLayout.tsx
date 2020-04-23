import classNames from 'classnames'
import React from 'react'

import { ILayoutProps } from '../../types/layout'
import { staffMenuItems } from './StaffLayout'

import Layout from '.'
import { INavMenuItem } from '../Nav/NavMenuItem'
import VerticalNav from '../Nav/VerticalNav'
import LayoutContent from './LayoutContent'

const teacherMenuItems: INavMenuItem[] = [
    { label: 'Student Check-in', href: 'check-in', icon: 'how_to_vote' }
]

class TeacherLayout extends React.Component<ILayoutProps> {
    render() {
        return (
            <Layout orientation='vertical'>
                <VerticalNav menuItems={[...teacherMenuItems, ...staffMenuItems]} />
                <LayoutContent orientation='vertical'>
                    {this.props.children}
                </LayoutContent>
            </Layout>
        )
    }
}

export default TeacherLayout
