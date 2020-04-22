import React from 'react'

import VerticalNav from '../Nav/VerticalNav'

interface ITeacherLayoutProps {
    children: any
}

class TeacherLayout extends React.Component<ITeacherLayoutProps> {
    render() {
        return (
            <>
                <VerticalNav />
                {this.props.children}
            </>
        )
    }
}

export default TeacherLayout
