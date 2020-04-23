import React from 'react'

import VerticalNav from '../Nav/VerticalNav'
import { INavMenuItemProps } from '../Nav/NavMenuItem'

interface ITeacherLayoutProps {
    children: any
}

class TeacherLayout extends React.Component<ITeacherLayoutProps> {
    render() {
        const menuItems: INavMenuItemProps[] = [
            { label: 'Student Check-in', href: 'check-in', icon: 'alarm' }
        ]
        return (
            <div className='layout'>
                <VerticalNav menuItems={menuItems} />
                {this.props.children}
            </div>
        )
    }
}

export default TeacherLayout
