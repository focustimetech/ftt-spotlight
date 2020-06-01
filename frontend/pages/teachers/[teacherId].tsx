import { AxiosResponse } from 'axios'
import Error from '../_error'
import React from 'react'

import {
    Button,
    Typography
} from '@material-ui/core'

import { fetchCalendar, fetchTeacherCalendar } from '../../actions/calendarActions'
import { fetchTeacher } from '../../actions/teacherActions'
import { NextPageContext } from '../../types'
import { ITeacher, IUser } from '../../types/auth'
import { ICalendar, ICalendarEvent, ICalendarEventContext } from '../../types/calendar'
import { getDisplayRole } from '../../utils/user'

import withAuth from '../../hocs/withAuth'
import Calendar, { getNextWeek, getPreviousWeek } from '../../components/Calendar'
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
    editable: boolean
    errorCode: number
}

interface ITeacherProfileState {
    calendar: ICalendar
    tab: number
}

class TeacherProfile extends React.Component<ITeacherProfileProps, ITeacherProfileState> {
    static getInitialProps = async (context: NextPageContext) => {
        const { store } = context
        const isServer: boolean = typeof window === 'undefined'
        console.log('query:', context.query)
        const teacherId: number = Number(context.query.teacherId)
        const currentUser: IUser = store.getState().auth.user
        const editable: boolean = currentUser.accountType === 'teacher' && currentUser.accountId === teacherId
        let calendar: ICalendar = {}
        let teacher: ITeacher = null
        let errorCode: number

        if (editable) {
            teacher = currentUser as ITeacher
            await store.dispatch(fetchCalendar()).catch((err: any) => {
                if (isServer) {
                    errorCode = err.response.status
                }
            })
        } else {
            await fetchTeacher(teacherId).then((res) => {
                teacher = res.data
            }, (err) => {
                if (isServer) {
                    errorCode = err.response.status
                }
            })
            await fetchTeacherCalendar(teacherId).then((res) => {
                calendar = res.data
            }, (err) => {
                errorCode = err.response.status
            })
        }

        return { errorCode, editable, teacher, calendar }
    }

    state: ITeacherProfileState = {
        calendar: {},
        tab: 0
    }

    fetchCalendar = (teacherId: number, date?: Date) => {
        fetchTeacherCalendar(teacherId, date).then((res: AxiosResponse<ICalendar>) => {
            this.setState((state: ITeacherProfileState) => ({
                calendar: { ...state.calendar, ...res.data }
            }))
        })
    }

    fetchNextCalendar = (date: Date) => {
        const nextWeek: Date = getNextWeek(date)
        this.fetchCalendar(this.props.teacher.accountId, date)
    }

    fetchPreviousCalendar = (date: Date) => {
        const previousWeek: Date = getPreviousWeek(date)
        this.fetchCalendar(this.props.teacher.accountId, date)
    }

    componentDidMount() {
        this.setState({ calendar: this.props.calendar }, () => {
            this.fetchNextCalendar(new Date())
            this.fetchPreviousCalendar(new Date())
        })
    }

    render() {
        const { teacher, calendar } = this.props
        if (!teacher) {
            return <Error statusCode={this.props.errorCode} withNavigation />
        }
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
                    subtitle={getDisplayRole(teacher.accountType)}
                    tabs={tabs}
                />
                {this.state.tab === 0 && (
                    <Section>
                        <Typography>Overview</Typography>
                    </Section>
                )}
                {this.state.tab === 1 && (
                    <Calendar
                        calendar={this.state.calendar}
                        getTitle={getTitle}
                        getColor={getColor}
                        onPrevious={this.fetchPreviousCalendar}
                        onNext={this.fetchNextCalendar}
                    />
                )}
            </>
        )
    }
}

export default withAuth()(TeacherProfile)
