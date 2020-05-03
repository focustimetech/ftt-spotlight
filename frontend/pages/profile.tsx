import React from 'react'
import { connect } from 'react-redux'

import { IUser } from '../types/auth'

import withAuth from '../hocs/withAuth'
import TeacherProfile from '../components/Profile/TeacherProfile'

interface IReduxProps {
    currentUser: IUser
}

class Profile extends React.Component<IReduxProps> {
    render() {
        const { currentUser } = this.props
        if (currentUser) {
            switch (currentUser.accountType) {
                case 'teacher':
                    return <TeacherProfile editable user={currentUser} />
            }
        }
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user
})

export default withAuth()(connect(mapStateToProps)(Profile))
