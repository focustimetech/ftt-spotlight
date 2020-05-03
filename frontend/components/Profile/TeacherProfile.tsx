import React from 'react'

import { IProfileProps } from '../../types/components/profile'
import { getDisplayRole } from '../../utils/user'

import TopBar from '../TopBar'

class TeacherProfile extends React.Component<IProfileProps> {
    render() {
        const { user, editable } = this.props

        return (
            
            <TopBar title={user.name} avatar={user.avatar} subtitle={getDisplayRole(user.accountType)} />
        )
    }
}

export default TeacherProfile
