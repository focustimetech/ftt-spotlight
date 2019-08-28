import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    TextField,
    Tooltip
} from '@material-ui/core'

import { ITopic } from '../../types/calendar'
import { TopicColor } from '../../theme'
import { ITopicRequest } from '../../actions/topicActions'
import { EmptyStateIcon } from '../EmptyStateIcon'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { LoadingButton } from '../Form/LoadingButton';
import { CalendarDialogItem } from '../Calendar/CalendarDialogItem'
import { ColorsDialog } from './ColorsDialog'
import { createTopic, deleteTopic, fetchTopics} from '../../actions/topicActions'

const emptyTopic: ITopicRequest = {
    memo: '',
    color: 'blue'
}

interface ReduxProps {
    topics: ITopic[]
    createTopic: (topic: ITopicRequest) => Promise<any>
    deleteTopic: (topicID: number) => Promise<any>
    fetchTopics: () => Promise<any>
}

interface IProps extends ReduxProps {
    open: boolean
    onClose: () => void
}

interface IState {
    loadingTopics: boolean
    loadingNewTopic: boolean
    errored: boolean
    newTopicErrored: boolean
    newTopicOpen: boolean
    colorDialogOpen: boolean
    newTopic: ITopicRequest
}

class TopicsDialog extends React.Component<IProps, IState> {
    state: IState = {
        loadingTopics: false,
        loadingNewTopic: false,
        errored: false,
        newTopicErrored: false,
        newTopicOpen: false,
        colorDialogOpen: false,
        newTopic: emptyTopic
    }

    handleNewTopicOpen = () => {
        this.setState({ newTopicOpen: true })
    }

    handleNewTopic = () => {
        
    }

    handleNewTopicChange = (event: any) => {
        const memo: string = event.target.value
        if (this.state.loadingNewTopic)
            return
        this.setState((state: IState) => {
            return {
                newTopic: { ...state.newTopic, memo }
            }
        })
    }

    handleTopicColorChange = (color: TopicColor) => {
        this.setState((state: IState) => {
            return {
                newTopic: { ...state.newTopic, color }
            }
        })
    }

    handleColorDialogClose = () => {
        this.setState({ colorDialogOpen: false })
    }

    handleColorDialogOpen = () => {
        this.setState({ colorDialogOpen: true })
    }

    handleDeleteTopic = (topic: ITopic) => {

    }

    componentDidMount() {
        this.setState({ loadingTopics: true })
        this.props.fetchTopics()
            .then(res => {
                this.setState({ loadingTopics: false })
            })
    }

    render() {
        return (
            <>
            <Dialog className='topics_dialog' open={this.props.open}>
                <EnhancedDialogTitle title='Topics' onClose={this.props.onClose} />
                <DialogContent>
                    {this.state.loadingTopics ? (
                        <h2>Loading</h2>
                    ) : (
                        <>
                            {((!this.props.topics || this.props.topics.length === 0) && !this.state.newTopicOpen) && (
                                <EmptyStateIcon variant='not-found'>
                                    <h3>You don't have any Topics yet.</h3>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => this.handleNewTopicOpen()}
                                    >New Topic</Button>
                                </EmptyStateIcon>
                            )}
                            {(this.props.topics && this.props.topics.length > 0) && (
                                this.props.topics.map((topic: ITopic) => (
                                    <CalendarDialogItem
                                        details={{
                                            id: topic.id,
                                            title: topic.memo,
                                            variant: topic.color
                                        }}
                                        actions={[
                                            { value: 'Delete Topic', callback: () => this.handleDeleteTopic(topic)}
                                        ]}
                                    />
                                ))
                            )}
                            {this.state.newTopicOpen && (
                                <>
                                    <div className='topics_dialog__new'>
                                        <div className={classNames('color_swatch', `--${this.state.newTopic.color}`)}>
                                            <Tooltip title='Change Color' placement='top'>
                                                <IconButton onClick={() => this.handleColorDialogOpen()}>
                                                    <Icon>palette</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <TextField
                                            value={this.state.newTopic.memo}
                                            onChange={this.handleNewTopicChange}
                                            variant='filled'
                                            label='New Topic'
                                            placeholder='What will you be offering?'
                                            margin='none'
                                            helperText={this.state.newTopicErrored ? 'Please try that again.' : undefined}
                                            error={this.state.errored}
                                            autoFocus
                                            fullWidth
                                        />
                                    </div>
                                    <LoadingButton
                                        variant='contained'
                                        color='primary'
                                        onClick={() => this.handleNewTopic()}
                                        loading={this.state.loadingNewTopic}
                                    >Submit</LoadingButton>
                                </>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant='text' color='primary' onClick={() => this.handleNewTopicOpen()}>New Topic</Button>
                    <Button variant='text' onClick={() => this.props.onClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <ColorsDialog
                open={this.state.colorDialogOpen}
                onClose={this.handleColorDialogClose}
                onSelect={this.handleTopicColorChange}
                selected={this.state.newTopic.color}
            />
        </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    topics: state.topics.items,
    newTopic: state.topics.item
})

const mapDispatchToProps = {
    createTopic,
    deleteTopic,
    fetchTopics
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsDialog)