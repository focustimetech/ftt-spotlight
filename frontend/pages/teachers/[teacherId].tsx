import React from 'react'

import {
    Typography
} from '@material-ui/core'

import { fetchCalendar, fetchTeacherCalendar } from '../../actions/calendarActions'
import { fetchTeacher } from '../../actions/teacherActions'
import { NextPageContext } from '../../types'
import { ITeacher, IUser } from '../../types/auth'
import { ICalendar, ICalendarEvent, ICalendarEventContext } from '../../types/calendar'
import { getDisplayRole } from '../../utils/user'

import withAuth from '../../hocs/withAuth'
import Calendar from '../../components/Calendar'
import Section from '../../components/Layout/Section'
import TopBar, { ITabs } from '../../components/TopBar'

const getTitle = (event: ICalendarEvent): string => {
    return event.context.topic ? event.context.topic.memo : 'No Topic'
}

const getColor = (event: ICalendarEvent): string => {
    return event.context.topic ? event.context.topic.color : undefined
}

interface IReduxProps {
    currentUser: IUser
}

interface ITeacherProfileProps extends IReduxProps {
    teacher: ITeacher
    calendar: ICalendar
}

interface ITeacherProfileState {
    calendar: ICalendar
    tab: number
}

class TeacherProfile extends React.Component<ITeacherProfileProps, ITeacherProfileState> {
    static getInitialProps = async (context: NextPageContext) => {
        const { store } = context
        const teacherId: number = Number(context.query)
        const currentUser: IUser = store.getState().auth.user
        const editable: boolean = currentUser.accountType === 'teacher' && currentUser.accountId === teacherId
        let calendar: ICalendar = {}
        let teacher: ITeacher = null

        if (editable) {
            await store.dispatch(fetchCalendar())
        } else {
            await fetchTeacherCalendar(teacherId).then((res) => {
                calendar = res.data
            })
            await fetchTeacher(teacherId).then((res) => {
                teacher = res.data
            })
        }

        return { teacher, calendar }
    }

    state: ITeacherProfileState = {
        calendar: {},
        tab: 0
    }

    render() {
        const { teacher, calendar } = this.props
        const tabs: ITabs = {
            tabs: ['Overview', 'Calendar'],
            onChange: (tab: number) => this.setState({ tab }),
            value: this.state.tab
        }

        return (
            <>
                <TopBar
                    title={teacher.name}
                    avatar={teacher.avatar}
                    subtitle={getDisplayRole('teacher')}
                    tabs={tabs}
                />
                {this.state.tab === 0 && (
                    <Section>
                        <Typography>Overview</Typography>
                    </Section>
                )}
                {this.state.tab === 1 && (
                    <Calendar calendar={this.state.calendar} getTitle={getTitle} getColor={getColor} />
                )}
            </>
        )
    }
}

export default withAuth()(TeacherProfile)
