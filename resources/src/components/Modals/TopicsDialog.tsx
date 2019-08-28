import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Icon,
    IconButton,
    List,
    ListItem,
} from '@material-ui/core'

import { ITopic } from '../../types/calendar'
import { ITopicRequest } from '../../actions/topicActions'
import { EmptyStateIcon } from '../EmptyStateIcon'
import { EnhancedDialogTitle } from './EnhancedDialogTItle'
import { LoadingButton } from '../Form/LoadingButton';

const emptyTopic: ITopicRequest = {
    memo: '',
    color: 'blue'
}

interface ReduxProps {
    topics: ITopic[]
    fetchTopics: () => Promise<any>
    createTopic: (topic: ITopicRequest) => Promise<any>
}

interface IProps extends ReduxProps{
    open: boolean
    onClose: () => void
}

interface IState {
    loadingTopics: boolean
    loadingNewTopic: boolean
    errored: boolean
    newTopicOpen: boolean
    newTopic: ITopicRequest
}

class TopicsDialog extends React.Component<IProps, IState> {
    state: IState = {
        loadingTopics: false,
        loadingNewTopic: false,
        errored: false,
        newTopicOpen: false,
        newTopic: emptyTopic
    }

    handleNewTopicOpen = () => {
        this.setState({ newTopicOpen: true })
    }

    componentDidMount() {

    }

    render() {
        return (
            <Dialog className='topics_dialog' open={this.props.open}>
                <EnhancedDialogTitle title='Topics' onClose={this.props.onClose} />
                <DialogContent>
                    {this.state.loadingTopics ? (
                        <h2>Loading</h2>
                    ) : (
                        <>
                            {((!this.props.topics || this.props.topics.length === 0) && !this.state.newTopicOpen) && (
                                <EmptyStateIcon variant='notification'>
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
                                    <h3>New topic</h3>
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
        )
    }
}

export default TopicsDialog