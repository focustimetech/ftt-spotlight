import React from 'react'
import { connect } from 'react-redux'

import { IUser } from '../../types/auth'
import { ILayoutContainerProps, Orientation } from '../../types/layout'

import GuardianLayout from './GuardianLayout'
import LayoutContainer from './LayoutContainer'
import StaffLayout from './StaffLayout'
import StudentLayout from './StudentLayout'

const DEFAULT_ORIENTATION: Orientation = 'vertical'

interface IReduxProps {
    currentUser: IUser
}

class Layout extends React.Component<IReduxProps & ILayoutContainerProps> {
    render() {
        const { currentUser } = this.props

        if (currentUser && currentUser.accountType) {
            switch (currentUser.accountType) {
                case 'guardian':
                    return <GuardianLayout>{this.props.children}</GuardianLayout>
                case 'staff':
                    return <StaffLayout>{this.props.children}</StaffLayout>
                case 'student':
                    return <StudentLayout>{this.props.children}</StudentLayout>
                case 'teacher':
                    return <StudentLayout>{this.props.children}</StudentLayout>
            }
        }

        return (
            <LayoutContainer orientation={DEFAULT_ORIENTATION}>
                {this.props.children}
            </LayoutContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user
})

export default connect(mapStateToProps)(Layout)
