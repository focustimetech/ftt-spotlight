import { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Typography
} from '@material-ui/core'

import { fetchCalendar, fetchTeacherCalendar } from '../../actions/calendarActions'
import { fetchTeacher } from '../../actions/teacherActions'
import { createTopicSchedule } from '../../actions/topicActions'
import { NextPageContext } from '../../types'
import { ITeacher, IUser } from '../../types/auth'
import { ITopicSchedule, ITopic } from '../../types/topic'
import { ICalendar, ICalendarEvent, ICalendarEventContext, ICalendarContextDetails } from '../../types/calendar'
import { makeDocumentTitle } from '../../utils/document'
import { getDisplayRole } from '../../utils/user'

import withAuth from '../../hocs/withAuth'
import Calendar, { getNextWeek, getPreviousWeek } from '../../components/Calendar'
import ButtonSelect from '../../components/Form/Components/ButtonSelect'
import TopicsDialog from '../../components/Modals/TopicsDialog'
import Section from '../../components/Layout/Section'
import TopBar, { ITabs } from '../../components/TopBar'
import Error from '../_error'
import { getCalendarDateKey } from '../../utils/date'

const getTitle = (event: ICalendarEvent): string => {
    return event.context.topic ? event.context.topic.memo : 'No Topic'
}

const getColor = (event: ICalendarEvent): string => {
    return event.context.topic ? event.context.topic.color : undefined
}

interface IReduxProps {
    currentUser: IUser
    createTopicSchedule: (topicSchedule: ITopicSchedule) => Promise<any>
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
    topicsMenuAnchorEl: Element
}

class TeacherProfile extends React.Component<ITeacherProfileProps, ITeacherProfileState> {
    static getInitialProps = async (context: NextPageContext) => {
        const { store } = context
        const isServer: boolean = typeof window === 'undefined'
        // console.log('query:', context.query)
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
        tab: 0,
        topicsMenuAnchorEl: null
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

    handleOpenTopicSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ topicsMenuAnchorEl: event.currentTarget })
    }

    handleCloseTopicSelect = () => {
        this.setState({ topicsMenuAnchorEl: null })
    }

    componentDidMount() {
        if (!this.props.teacher) {
            return
        }
        this.setState({ calendar: this.props.calendar }, () => {
            this.fetchNextCalendar(new Date())
            this.fetchPreviousCalendar(new Date())
        })
    }

    render() {
        const { editable, errorCode, teacher, calendar } = this.props
        if (!teacher) {
            return <Error statusCode={errorCode} withNavigation />
        }
        const tabs: ITabs = {
            tabs: ['Overview', 'Calendar'],
            onChange: (tab: number) => this.setState({ tab }),
            value: this.state.tab
        }

        const getContextTitle = (contextDetails: ICalendarContextDetails): React.ReactNode => {
            const { event, date } = contextDetails
            const handleSelectTopic = (topic: ITopic) => {
                const topicSchedule: ITopicSchedule = {
                    topic,
                    date: getCalendarDateKey(date),
                    blockId: event.id
                }
                console.log('topicSchedule:', topicSchedule)
                this.props.createTopicSchedule(topicSchedule)
            }
            return (
                <>
                    <ButtonSelect open={false} onClick={this.handleOpenTopicSelect}>
                        <Typography variant='h5'>
                            {event.context.topic ? event.context.topic.memo : 'No Topic'}
                        </Typography>
                    </ButtonSelect>
                    <TopicsDialog
                        anchorEl={this.state.topicsMenuAnchorEl}
                        onClose={this.handleCloseTopicSelect}
                        selected={event.context.topic ? event.context.topic.id : -1}
                        onSelect={handleSelectTopic}
                    />
                </>
            )
        }

        return (
            <>
                <Head><title>{makeDocumentTitle(teacher.name)}</title></Head>
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
                        calendar={editable ? this.props.calendar : this.state.calendar}
                        getTitle={getTitle}
                        getContextTitle={editable ? getContextTitle : undefined}
                        getColor={getColor}
                        onPrevious={this.fetchPreviousCalendar}
                        onNext={this.fetchNextCalendar}
                    />
                )}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    calendar: state.calendar.calendar
})

const mapDispatchToProps = { createTopicSchedule }

export default withAuth()(connect(mapStateToProps, mapDispatchToProps)(TeacherProfile))
