import React from 'react'
import { connect } from 'react-redux'

import { IUser } from '../../types/auth'
import { ILayoutContainerProps, Orientation } from '../../types/layout'

import HorizontalNav from '../Nav/HorizontalNav'
import VerticalNav from '../Nav/VerticalNav'

import GuardianLayout from './GuardianLayout'
import LayoutContainer from './LayoutContainer'
import StaffLayout from './StaffLayout'
import StudentLayout from './StudentLayout'
import TeacherLayout from './TeacherLayout'

const DEFAULT_ORIENTATION: Orientation = 'horizontal'

interface ILayoutProps extends ILayoutContainerProps {
    user?: IUser
}

class Layout extends React.Component<ILayoutProps> {
    render() {
        console.log('Layout.user:', this.props.user)
        const { user } = this.props

        if (user && user.accountType) {
            switch (user.accountType) {
                case 'guardian':
                    return <GuardianLayout>{this.props.children}</GuardianLayout>
                case 'staff':
                    return <StaffLayout>{this.props.children}</StaffLayout>
                case 'student':
                    return <StudentLayout>{this.props.children}</StudentLayout>
                case 'teacher':
                    return <TeacherLayout>{this.props.children}</TeacherLayout>
                default:
                    return (
                        <LayoutContainer orientation={DEFAULT_ORIENTATION}>
                            {DEFAULT_ORIENTATION === 'horizontal' ? (
                                <HorizontalNav />
                            ) : (
                                <VerticalNav />
                            )}
                            {this.props.children}
                        </LayoutContainer>
                    )
            }
        }

        return <LayoutContainer orientation='horizontal'>{this.props.children}</LayoutContainer>
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user
})

export default connect(mapStateToProps)(Layout)