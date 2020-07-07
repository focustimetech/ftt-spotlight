import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'

import { fetchClassrooms } from '../../actions/classroomActions'
import { fetchTeachers } from '../../actions/teacherActions'
import { NextPageContext } from '../../types'
import { ITeacher } from '../../types/auth'
import { IClassroom } from '../../types/classroom'
import { TableColumns } from '../../types/table'
import { makeDocumentTitle } from '../../utils/document'

import Avatar from '../../components/Avatar'
import DateBlockPicker from '../../components/Calendar/DateBlockPicker'
import Flexbox from '../../components/Layout/Flexbox'
import Section from '../../components/Layout/Section'
import EnhancedTable from '../../components/Table/EnhancedTable'
import TopBar from '../../components/TopBar'
import withAuth from '../../hocs/withAuth'

interface IClassroomsPageState {
    date: Date
    blockId: number
}

interface IClassroomsTableData {
    classroomName: string
    availability: number
    // capacityData: string    // e.g. 5/30
}

interface IReduxProps {
    classrooms: IClassroom[]
    teachers: Record<number, ITeacher>
}

class ClassroomsPage extends React.Component<IReduxProps, IClassroomsPageState> {
    static async getInitialProps(context: NextPageContext) {
        const { store } = context
        const classrooms = store.getState().classrooms.items
        const teachers: Record<number, ITeacher> = store.getState().teachers.teachers
        if (!classrooms || classrooms.length === 0) {
            await store.dispatch(fetchClassrooms())
        }
        if (!teachers || Object.keys(teachers).length === 0) {
            await store.dispatch(fetchTeachers())
        }

        return {}
    }

    state: IClassroomsPageState = {
        date: new Date(),
        blockId: -1
    }

    handleChangeDate = (date: Date) => {
        this.setState({ date })
    }

    handleSelectBlock = (event: React.ChangeEvent<{ name?: string, value: number }>) => {
        const { value } = event.target
        this.setState({ blockId: value })
    }

    render() {
        const { date } = this.state
        const tableColumns: TableColumns<IClassroomsTableData> = {
            classroomName: { label: 'Classroom', primary: true, searchable: true, filterable: true, type: 'string', sortLabel: 'Name' },
            availability: {
                label: 'Availability',
                searchable: false,
                filterable: false,
                type: 'string',
                render: (value: number) => {
                    const teacher: ITeacher = this.props.teachers[value]
                    return teacher
                        ? (
                            <Flexbox>
                                <Avatar avatar={teacher.avatar} />
                                <Typography variant='inherit'>{teacher.name}</Typography>
                            </Flexbox>
                        ) : (
                            <em><Typography>Room Available</Typography></em>
                        )
                }
            },
            // capacityData: { label: 'Capacity', }
        }

        const tableData: IClassroomsTableData[] = this.props.classrooms.map((classroom: IClassroom, index: number) => {
            return { classroomName: classroom.name, availability: (index % 2) === 0 ? 5 : -1 }
        })

        return (
            <div className='classrooms'>
                <Head><title>{makeDocumentTitle('Classrooms')}</title></Head>
                <TopBar title='Classrooms'>
                    <DateBlockPicker
						date={date}
						onChange={this.handleChangeDate}
						variant='day'
						onSelectBlock={this.handleSelectBlock}
						blockId={this.state.blockId}
					/>
                </TopBar>
                <Section>
                    <EnhancedTable<IClassroomsTableData>
                        title='Classrooms'
                        columns={tableColumns}
                        data={tableData}
                        selected={[]}
                        onSelect={() => null}
                    />
                </Section>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    classrooms: state.classrooms.items,
    teachers: state.teachers.teachers
})

const mapDispatchToProps = null

export default withAuth('staff', 'teacher', 'sysadmin')(connect(mapStateToProps, mapDispatchToProps)(ClassroomsPage))
