import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    FormControl,
    Icon,
    InputLabel,
    MenuItem,
    MenuList,
    Select,
    Typography,
    TextField
} from '@material-ui/core'

import { fetchClassrooms } from '../../../actions/classroomActions'
import { createTopic, deleteTopic, fetchTopics } from '../../../actions/topicActions'
import { ISnackbar, queueSnackbar } from '../../../actions/snackbarActions'
import { INewClassroom, IClassroom } from '../../../types/classroom'
import { ITopic, INewTopic } from '../../../types/topic'

import ColorPicker, { randomColor } from '../Pickers/ColorPicker'
import { LoadingButton } from '../Components/LoadingButton'
import Form, { FormRow, FormRowElement } from '../'

export interface ITopicsFormProps {
    selected: number
    onSelect: (topic: ITopic) => void
}

interface IReduxProps {
    classrooms: IClassroom[]
    topics: ITopic[]
    createTopic: (topic: INewTopic, classroom?: INewClassroom) => Promise<any>
    deleteTopic: (topicId: number) => Promise<any>
    fetchClassrooms: () => Promise<any>
    fetchTopics: () => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface ITopcisFormState {
    editing: boolean
    memo: string
    color: string
    capacity: number
    classroom: number
    classroomName: string
    loadingTopic: boolean
}

class TopicsForm extends React.Component<ITopicsFormProps & IReduxProps, ITopcisFormState> {
    state: ITopcisFormState = {
        editing: false,
        memo: '',
        color: randomColor(),
        capacity: 30,
        classroom: -1,
        classroomName: '',
        loadingTopic: false
    }

    handleOpenEditing = () => {
        this.setState((state: ITopcisFormState) => ({
            editing: true,
            classroom: this.props.classrooms.length > 0 ? this.props.classrooms[0].id : state.classroom
        }))
    }

    handleChangeMemo = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target
        this.setState({ memo: value })
    }

    handleSelectColor = (color: string) => {
        this.setState({ color })
    }

    handleSelectClassroom = (event: React.ChangeEvent<{ name?: string, value: any }>) => {
        const { value } = event.target
        this.setState({ classroom: value })
    }

    handleChangeClassroomName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target
        this.setState({ classroomName: value })
    }

    handleChangeCapacity = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target
        this.setState({ capacity: Number(value) })
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const topic: INewTopic = {
            memo: this.state.memo,
            color: this.state.color.replace(/#/, ''),
            classroomId: this.state.classroom
        }
        const classroom: INewClassroom = {
            name: this.state.classroomName,
            capacity: this.state.capacity
        }

        this.setState({ loadingTopic: true })
        this.props.createTopic(topic, this.isCreatingClassroom() ? classroom : undefined).then(() => {
            this.setState((state: ITopcisFormState) => ({
                loadingTopic: false,
                color: randomColor(),
                memo: '',
                classroomName: this.isCreatingClassroom() ? '' : state.classroomName
            }))
            this.props.queueSnackbar({ message: 'Created new Topic.' })
        }, () => {
            this.setState({ loadingTopic: false })
        })
    }

    isCreatingClassroom = (): boolean => {
        return this.state.classroom === -1
    }
    
    handleSelectTopic = (topic: ITopic) => {
        this.props.onSelect(topic)
    }

    componentDidMount() {
        if (this.props.topics.length === 0) {
            this.props.fetchTopics()
        }
        if (this.props.classrooms.length === 0) {
            this.props.fetchClassrooms()
        }
    }

    render() {
        const { classrooms, topics } = this.props

        return (
        
            <Form className='list-form__inner' onSubmit={this.handleSubmit} autoComplete='off'>
                <MenuList>
                    {topics.length > 0 && topics.map((topic: ITopic) => (
                        <MenuItem onClick={() => this.handleSelectTopic(topic)}>
                            <span className='swatch' style={{ background: `#${topic.color}` }} />
                            <Typography variant='inherit' noWrap>{topic.memo}</Typography>
                        </MenuItem>
                    ))}
                </MenuList>
                <div className='list-form__actions'>
                    {topics.length === 0 && (
                        <Typography>Your Topics will appear here.</Typography>
                    )}
                    {this.state.editing ? (
                        <>
                            <FormRow>
                                <TextField
                                    variant='outlined'
                                    margin='dense'
                                    fullWidth
                                    name='topic-memo'
                                    label='Memo'
                                    placeholder='Your Focus topic'
                                    value={this.state.memo}
                                    onChange={this.handleChangeMemo}
                                    required
                                />
                            </FormRow>
                            <FormRow>
                                <FormRowElement fullWidth>
                                    <FormControl variant='outlined' margin='dense' fullWidth>
                                        <InputLabel id='classroom-select-label'>Classroom</InputLabel>
                                        <Select
                                            labelId='classroom-select-label'
                                            name='topic-classroom'
                                            value={this.state.classroom}
                                            onChange={this.handleSelectClassroom}
                                            label='Classroom'
                                        >
                                            <MenuItem value={-1}><em>New Classroom</em></MenuItem>
                                            {classrooms && classrooms.length > 0 && classrooms.map((classroom: IClassroom) => (
                                                <MenuItem value={classroom.id} key={classroom.id}>
                                                    <Typography variant='inherit' noWrap>{classroom.name}</Typography>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </FormRowElement>
                                <ColorPicker
                                    value={this.state.color}
                                    onChange={this.handleSelectColor}
                                    variant='outlined'
                                    margin='dense'
                                />
                            </FormRow>
                            {this.isCreatingClassroom() && (
                                <FormRow>
                                    <TextField
                                        label='Classroom'
                                        value={this.state.classroomName}
                                        onChange={this.handleChangeClassroomName}
                                        placeholder='Your classroom name'
                                        name='topic-classroom-name'
                                        fullWidth
                                        margin='dense'
                                        variant='outlined'
                                        required
                                    />
                                    <TextField
                                        label='Capacity'
                                        type='number'
                                        name='topic-classroom-capacity'
                                        value={this.state.capacity}
                                        onChange={this.handleChangeCapacity}
                                        margin='dense'
                                        variant='outlined'
                                        required
                                    />
                                </FormRow>
                            )}
                            <FormRow justifyContent='flex-end'>
                                <LoadingButton loading={this.state.loadingTopic} type='submit' variant='text' color='primary'>Create</LoadingButton>
                            </FormRow>
                        </>
                    ) : (
                        <Button variant='text' onClick={() => this.handleOpenEditing()} startIcon={<Icon>add</Icon>}>Create Topic</Button>
                    )}
                </div>
            </Form>
        )
    }
}

const mapStateToProps = (state) => ({
    topics: state.topics.items,
    classrooms: state.classrooms.items
})

const mapDispatchToProps = { createTopic, deleteTopic, fetchClassrooms, fetchTopics, queueSnackbar }

export default connect(mapStateToProps, mapDispatchToProps)(TopicsForm)
