import React from 'react'

import { INavMenuItem } from '../Nav/NavMenuItem'
import { teacherMenuItems } from './TeacherLayout'

import VerticalNav from '../Nav/VerticalNav'
import LayoutContainer from './LayoutContainer'
import LayoutContent from './LayoutContent'

export const staffMenuItems: INavMenuItem[] = [
    { label: 'Reporting', href: 'reporting', icon: 'assessment' }
]

const StaffLayout = () => {
    return (
        <LayoutContainer orientation='vertical'>
            <VerticalNav menuItems={[...teacherMenuItems, ...staffMenuItems]} hiddenMenuItems={clusters} />
            <LayoutContent orientation='vertical'>
                {this.props.children}
            </LayoutContent>
        </LayoutContainer>
    )
}

export default StaffLayout
