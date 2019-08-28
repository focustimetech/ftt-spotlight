import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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
import { DeleteTopic } from './DeleteTopic'
import { createTopic, deleteTopic, fetchTopics} from '../../actions/topicActions'
import { isEmpty } from '../../utils/utils'

const emptyTopic: ITopicRequest = {
    memo: '',
    color: 'blue'
}

interface ReduxProps {
    topics: ITopic[]
    newTopic: ITopic
    createTopic: (topic: ITopicRequest) => Promise<any>
    deleteTopic: (topicID: number) => Promise<any>
    fetchTopics: () => Promise<any>
}

interface IProps extends ReduxProps {
    open: boolean
    mode: 'edit' | 'select'
    onClose: () => void
    onSelect: (topic: ITopic) => void
}

interface IState {
    loadingTopics: boolean
    loadingNewTopic: boolean
    errored: boolean
    newTopicErrored: boolean
    newTopicOpen: boolean
    colorDialogOpen: boolean
    newTopic: ITopicRequest
    deleteTopicDialogOpen: boolean
    deleteTopic: ITopic
}

class TopicsDialog extends React.Component<IProps, IState> {
    state: IState = {
        loadingTopics: false,
        loadingNewTopic: false,
        errored: false,
        newTopicErrored: false,
        newTopicOpen: false,
        colorDialogOpen: false,
        newTopic: emptyTopic,
        deleteTopicDialogOpen: false,
        deleteTopic: null
    }

    handleNewTopicOpen = () => {
        this.setState({ newTopicOpen: true })
    }

    handleNewTopicClose = () => {
        this.setState({ newTopicOpen: false })
    }

    handleNewTopic = () => {
        this.setState({
            loadingNewTopic: true,
            newTopicErrored: false
        })
        this.props.createTopic(this.state.newTopic)
            .then((res: any) => {
                this.setState({
                    loadingNewTopic: false,
                    newTopicOpen: false,
                    newTopic: emptyTopic
                })
            })
            .catch((error: any) => {
                this.setState({
                    loadingNewTopic: false,
                    newTopicErrored: true
                })
            })
    }

    handleNewTopicChange = (event: any) => {
        const memo: string = event.target.value
        if (this.state.loadingNewTopic)
            return
        this.setState((state: IState) => {
            return {
                newTopic: { ...state.newTopic, memo },
                newTopicErrored: false
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

    handleColorDialogOpen = () => {
        this.setState({ colorDialogOpen: true })
    }

    handleColorDialogClose = () => {
        this.setState({ colorDialogOpen: false })
    }

    handleDeleteTopicDialogOpen = () => {
        this.setState({ deleteTopicDialogOpen: true })
    }

    handleDeleteTopicDialogClose = () => {
        this.setState({ deleteTopicDialogOpen: false })
    }

    handleDeleteTopic = (topic: ITopic) => {
        this.setState({ deleteTopic: topic })
        this.handleDeleteTopicDialogOpen()
    }

    onDeleteTopic = (): Promise<any> => {
        return this.props.deleteTopic(this.state.deleteTopic.id)
    }

    handleClose = () => {
        this.props.onClose()
        this.setState({ newTopicOpen: false })
    }

    handleClick = (topic: ITopic) => {
        this.props.onSelect(topic)
    }

    componentDidMount() {
        this.setState({ loadingTopics: true })
        this.props.fetchTopics()
            .then(res => {
                this.setState({ loadingTopics: false })
            })
    }

    componentWillReceiveProps(nextProps: IProps) {
		if (nextProps.newTopic && !isEmpty(nextProps.newTopic)) {
            this.props.topics.unshift(nextProps.newTopic)
		}
	}

    render() {
        return (
            <>
                <Dialog className='topics_dialog' open={this.props.open}>
                    <EnhancedDialogTitle title='Topics' onClose={this.props.onClose} />
                    <DialogContent>
                        <DialogContentText>
                            {this.props.mode === 'edit'
                                ? 'Create new Topics or edit already existing ones.'
                                : 'Select a Topic to use for the block.'
                            }
                        </DialogContentText>
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
                                            onClick={this.props.mode === 'select' ? () => this.handleClick(topic) : undefined}
                                            details={{
                                                id: topic.id,
                                                title: topic.memo,
                                                variant: topic.color
                                            }}
                                            actions={this.props.mode === 'edit' ? [
                                                { value: 'Delete Topic', callback: () => this.handleDeleteTopic(topic)}
                                            ] : undefined}
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
                                            variant='text'
                                            color='primary'
                                            onClick={() => this.handleNewTopic()}
                                            loading={this.state.loadingNewTopic}
                                        >Submit</LoadingButton>
                                        <Button variant='text' onClick={() => this.handleNewTopicClose()}>Cancel</Button>
                                    </>
                                )}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button variant='text' color='primary' onClick={() => this.handleNewTopicOpen()}>New Topic</Button>
                        <Button variant='text' onClick={() => this.handleClose()}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <ColorsDialog
                    open={this.state.colorDialogOpen}
                    onClose={this.handleColorDialogClose}
                    onSelect={this.handleTopicColorChange}
                    selected={this.state.newTopic.color}
                />
                <DeleteTopic
                    open={this.state.deleteTopicDialogOpen}
                    topic={this.state.deleteTopic}
                    onClose={this.handleDeleteTopicDialogClose}
                    onSubmit={this.onDeleteTopic}
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