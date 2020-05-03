import React from 'react'

import { IProfileProps } from '../../types/components/profile'
import { getDisplayRole } from '../../utils/user'

import TopBar from '../TopBar'

interface ITeacherProfileState {
    tab: number
}

class TeacherProfile extends React.Component<IProfileProps, ITeacherProfileState> {
    state: ITeacherProfileState = {
        tab: 0
    }

    render() {
        const { user, editable } = this.props
        const tabs: ITabs = {
            tabs: ['Overview', 'Calendar'],
            onChange: (tab: number) => this.setState({ tab }),
            value: this.state.tab
        }

        return (
            <TopBar
                title={user.name}
                avatar={user.avatar}
                subtitle={getDisplayRole(user.accountType)}
                tabs={tabs}
            />
        )
    }
}

export default TeacherProfile
