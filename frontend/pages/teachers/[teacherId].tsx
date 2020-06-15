import { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import Head from 'next/head'
import { Router, withRouter } from 'next/router'
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
    calendar: ICalendar
    currentUser: IUser
    fetchCalendar: (date: Date) => Promise<any>
    createTopicSchedule: (topicSchedule: ITopicSchedule) => Promise<any>
}

interface ITeacherProfileProps extends IReduxProps {
    teacher: ITeacher
    teacherCalendar: ICalendar
    editable: boolean
    errorCode: number
    router: Router
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
        const teacherId: number = Number(context.query.teacherId)
        let initialDate: Date = undefined
        if (context.query.d) {
            initialDate = new Date(context.query.d as string)
        }
        const currentUser: IUser = store.getState().auth.user
        const editable: boolean = currentUser.accountType === 'teacher' && currentUser.accountId === teacherId
        let teacherCalendar: ICalendar = {}
        let teacher: ITeacher = null
        let errorCode: number

        if (editable) {
            teacher = currentUser as ITeacher
            await store.dispatch(fetchCalendar(initialDate)).catch((err: any) => {
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
            await fetchTeacherCalendar(teacherId, initialDate).then((res) => {
                console.log('res.toda:', res.data)
                teacherCalendar = res.data
            }, (err) => {
                errorCode = err.response.status
            })
        }

        return { errorCode, editable, teacher, teacherCalendar }
    }

    state: ITeacherProfileState = {
        calendar: {},
        tab: 1,
        topicsMenuAnchorEl: null
    }

    /**
     * Populates the calendar with more date keys.
     * @param date The date to fetch for.
     */
    populateCalendar = (date: Date) => {
        const { editable, teacher } = this.props
        const key: string = getCalendarDateKey(date)
        if (editable) {
            // Fetch the current user's calendar.
            // Appending to already defined calendar keys is handled by redycer.
            this.props.fetchCalendar(date)
        } else {
            // Fetch the given teacher's calendar
            fetchTeacherCalendar(teacher.id, date).then((res: AxiosResponse<ICalendar>) => {
                // Append results to calendar
                this.setState((state: ITeacherProfileState) => ({
                    calendar: { ...state.calendar, ...res.data }
                }))
            })
        }
    }

    handleNextWeek = (date: Date) => {
        const nextWeek: Date = getNextWeek(date)
        this.populateCalendar(nextWeek)
    }

    handlePreviousWeek = (date: Date) => {
        const previousWeek: Date = getPreviousWeek(date)
        this.populateCalendar(previousWeek)
    }

    refreshQueryDate = (date: Date) => {
        console.log('r:', this.props.router)
        const { pathname, asPath } = this.props.router
        this.props.router.push(pathname, asPath, { query: { d: /*getCalendarDateKey(date)*/'test' }, shallow: true })
    }

    handleOpenTopicSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ topicsMenuAnchorEl: event.currentTarget })
    }

    handleCloseTopicSelect = () => {
        this.setState({ topicsMenuAnchorEl: null })
    }

    componentDidMount() {
        console.log('componentDidMount.props:', this.props)
        if (!this.props.teacher) {
            return
        }
        this.setState({ calendar: this.props.teacherCalendar }, () => {
            this.populateCalendar(getNextWeek(new Date()))
            this.populateCalendar(getPreviousWeek(new Date()))
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
                    AvatarProps={{ avatar: teacher.avatar }}
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
                        calendar={editable ? calendar : this.state.calendar}
                        getTitle={getTitle}
                        getContextTitle={editable ? getContextTitle : undefined}
                        getColor={getColor}
                        onPrevious={this.handlePreviousWeek}
                        onNext={this.handleNextWeek}
                        onDateChange={this.refreshQueryDate}
                        initialDate={this.props.router.query.d ? new Date(this.props.router.query.d as string) : undefined}
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

const mapDispatchToProps = { fetchCalendar, createTopicSchedule }

export default withAuth()(connect(mapStateToProps, mapDispatchToProps)(withRouter(TeacherProfile)))
