import React from 'react'
import { connect } from 'react-redux'

import { createTopic, deleteTopic, fetchTopics } from '../../actions/topicActions'
import { ITopic, INewTopic } from '../../types/topic'

import {
    Button,
    FormControl,
    Icon,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Popover,
    Select,
    Typography,
    TextField,
    Divider
} from '@material-ui/core'

import Flexbox from '../Layout/Flexbox'
import ColorPicker, { randomColor } from './ColorPicker'
import Form from './Form'
import FormRow from './FormRow'
import FormRowElement from './FormRowElement'

interface IReduxProps {
    topics: ITopic[]
    createTopic: (topic: INewTopic) => Promise<any>
    deleteTopic: (topicId: number) => Promise<any>
    fetchTopics: () => Promise<any>
}

interface ITopcisFormState {
    editing: boolean
    memo: string
    color: string
    capacity: number
    classroom: number
    classroomName: string
}

class TopicsForm extends React.Component<IReduxProps, ITopcisFormState> {
    state: ITopcisFormState = {
        editing: false,
        memo: '',
        color: randomColor(),
        capacity: 30,
        classroom: -1,
        classroomName: ''
    }

    handleOpenEditing = () => {
        this.setState({ editing: true })
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
    }

    render() {
        const topics: ITopic[] = [] /*
            { id: 1, memo: 'Xtreme Knitting', color: 'FF0000', classroomId: 1, teacherId: 1 },
            { id: 2, memo: 'African Hand-drumming', color: '00FF00', classroomId: 1, teacherId: 1 }
        ]*/

        return (
            <Popover open={true} PaperProps={{ className: 'list-form' }}>
                <Form className='list-form__inner' onSubmit={this.handleSubmit} autoComplete='off'>
                    <MenuList>
                        {topics.length > 0 && topics.map((topic: ITopic) => (
                            <MenuItem onClick={() => null}>
                                <ListItemIcon><span className='swatch' style={{ background: `#${topic.color}` }} /></ListItemIcon>
                                <Typography variant='inherit'>{topic.memo}</Typography>
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
                                                <MenuItem value={1}>B103</MenuItem>
                                                <MenuItem value={2}>A120</MenuItem>
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
                                {this.state.classroom === -1 && (
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
                                        />
                                        <TextField
                                            label='Capacity'
                                            type='number'
                                            name='topic-classroom-capacity'
                                            value={this.state.capacity}
                                            onChange={this.handleChangeCapacity}
                                            margin='dense'
                                            variant='outlined'
                                        />
                                    </FormRow>
                                )}
                                <FormRow>
                                    <Button type='submit' variant='text' color='primary'>Create</Button>
                                </FormRow>
                            </>
                        ) : (
                            <Button variant='text' onClick={() => this.handleOpenEditing()} startIcon={<Icon>add</Icon>}>Create Topic</Button>
                        )}
                    </div>
                </Form>
            </Popover>
        )
    }
}

const mapStateToProps = (state) => ({
    topics: state.topics.items
})

const mapDispatchToProps = { createTopic, deleteTopic, fetchTopics }

export default connect(mapStateToProps, mapDispatchToProps)(TopicsForm)
