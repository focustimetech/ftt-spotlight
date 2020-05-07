import React from 'react'

import {
    Typography
} from '@material-ui/core'

import { ICalendar } from '../../types/calendar'
import { IProfileProps } from '../../types/components/profile'
import API from '../../utils/api'
import { getDisplayRole } from '../../utils/user'

import Calendar from '../Calendar'
import Section from '../Layout/Section'
import TopBar, { ITabs } from '../TopBar'

interface ITeacherProfileState {
    calendar: ICalendar
    tab: number
}

class TeacherProfile extends React.Component<IProfileProps, ITeacherProfileState> {
    state: ITeacherProfileState = {
        calendar: {},
        tab: 0
    }

    componentDidMount() {
        API.get(`/teacher/${1}/calendar`).then((res: any) => {
            const data = res.data
            const calendar: ICalendar = {}
            Object.keys(data).forEach((date: string) => {
                calendar[date] = {
                    events: [],
                    blocks: data[date]
                }
            })
            this.setState({ calendar })
        })
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
                    <Section>
                        <Typography>Overview</Typography>
                    </Section>
                )}
                {this.state.tab === 1 && (
                    <Calendar calendar={this.state.calendar} />
                )}
            </>
        )
    }
}

export default TeacherProfile
