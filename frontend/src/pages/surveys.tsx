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

// import { fetchSurveys, fetchSurveyResponses } from '../../actions/surveyActions'
//import { fetchTeacher } from '../../actions/teacherActions'
import { NextPageContext } from '../types'
import { ITeacher, IUser } from '../types/auth'
import { INewSurvey, ISurvey } from '../types/survey'
import { ICalendar, ICalendarEvent, ICalendarEventContext, ICalendarContextDetails } from '../types/calendar'
import { makeDocumentTitle } from '../utils/document'

import withAuth from '../hocs/withAuth'
import Calendar, { getNextWeek, getPreviousWeek } from '../../components/Calendar'
//import ButtonSelect from '../../components/Form/Components/ButtonSelect'
import Section from '../components/Layout/Section'
import SurveyEditor, { newSurvey } from '../components/Survey/SurveyEditor'
import TopBar, { ITabs } from '../components/TopBar'



interface IReduxProps {
    calendar: ICalendar
    currentUser: IUser
    fetchCalendar: (date: Date) => Promise<any>
    // createTopicSchedule: (topicSchedule: ITopicSchedule) => Promise<any>
}

interface ISurveyPageProps extends IReduxProps {
    teacher: ITeacher
    teacherCalendar: ICalendar
    editable: boolean
    errorCode: number
    router: Router
}

interface ISurveyPageState {
    tab: number
    survey: INewSurvey
}

class TeacherProfile extends React.Component<ISurveyPageProps, ISurveyPageState> {
    static getInitialProps = async (context: NextPageContext) => {
        const { store } = context
        const isServer: boolean = typeof window === 'undefined'
        const teacherId: number = Number(context.query.teacherId)
        /*
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
        */
        return {}
    }

    state: ISurveyPageState = {
        tab: 0,
        survey: newSurvey
    }

    /**
     * Populates the calendar with more date keys.
     * @param date The date to fetch for.
     */
    /*
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
    */

    /*
    refreshQueryDate = (date: Date) => {
        console.log('r:', this.props.router)
        // const { pathname, asPath } = this.props.router
        // this.props.router.push(pathname, asPath, { query: { d: getCalendarDateKey(date) }, shallow: true })
       window.history.pushState('', '', `?d=${getCalendarDateKey(date)}`)
    }
    */

    handleChangeSurvey = (survey: INewSurvey) => {
        this.setState({ survey })
    }

    render() {
        // const { editable, errorCode, teacher, calendar } = this.props
        {/*
        if (!teacher) {
            return <Error statusCode={errorCode} withNavigation />
        }
        */}
        const tabs: ITabs = {
            tabs: ['Surveys', 'Responses'],
            onChange: (tab: number) => this.setState({ tab }),
            value: this.state.tab
        }

        return (
            <>
                <Head><title>{makeDocumentTitle('Surveys')}</title></Head>
                <TopBar title='Surveys' tabs={tabs} />
                {this.state.tab === 0 && (
                    <Section>
                        <SurveyEditor survey={this.state.survey} onChange={this.handleChangeSurvey} />
                    </Section>
                )}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    // currentUser: state.auth.user,
    // calendar: state.calendar.calendar
})

const mapDispatchToProps = null// { fetchCalendar, createTopicSchedule }

export default withAuth('teacher')(connect(mapStateToProps, mapDispatchToProps)(withRouter(TeacherProfile)))
