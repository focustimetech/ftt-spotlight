import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    List,
    ListItem,
    TextField
} from '@material-ui/core'

import { ITopic } from '../../types/calendar'
import { TopicColor } from '../../theme'
import { ITopicRequest } from '../../actions/topicActions'
import { EmptyStateIcon } from '../EmptyStateIcon'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { LoadingButton } from '../Form/LoadingButton';
import { ColorsDialog } from './ColorsDialog'

const emptyTopic: ITopicRequest = {
    memo: 'hello',
    color: 'blue'
}

interface ReduxProps {
    topics?: ITopic[]
    fetchTopics?: () => Promise<any>
    createTopic?: (topic: ITopicRequest) => Promise<any>
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

    componentDidMount() {

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
                                <List>
                                    {this.props.topics.map((topic: ITopic) => (
                                        <ListItem key={topic.id}>{topic.memo}</ListItem>
                                    ))}
                                </List>
                            )}
                            {this.state.newTopicOpen && (
                                <div className='topics_dialog__new'>
                                    <TextField
                                        value={this.state.newTopic.memo}
                                        onChange={this.handleNewTopicChange}
                                        variant='filled'
                                        label='New Topic'
                                        placeholder='What will you be offering?'
                                        margin='normal'
                                        helperText={this.state.newTopicErrored ? 'Please try that again.' : undefined}
                                        error={this.state.errored}
                                        autoFocus
                                        fullWidth
                                    />
                                    <LoadingButton
                                        variant='text'
                                        color='primary'
                                        onClick={() => this.handleNewTopic()}
                                        loading={this.state.loadingNewTopic}
                                    >Submit</LoadingButton>
                                </div>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <LoadingButton variant='text' color='primary' loading={false}>New Topic</LoadingButton>
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

export default TopicsDialog