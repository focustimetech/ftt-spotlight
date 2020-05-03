import React from 'react'

import {
    Typography
} from '@material-ui/core'

import { IProfileProps } from '../../types/components/profile'
import { getDisplayRole } from '../../utils/user'

import Calendar from '../Calendar/NewCalendar'
import TopBar, { ITabs } from '../TopBar'

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
            <>
                <TopBar
                    title={user.name}
                    avatar={user.avatar}
                    subtitle={getDisplayRole(user.accountType)}
                    tabs={tabs}
                />
                {this.state.tab === 0 && (
                    <Typography>Overview</Typography>
                )}
                {this.state.tab === 1 && (
                    <Calendar calendar={{}} />
                )}
            </>
        )
    }
}

export default TeacherProfile
