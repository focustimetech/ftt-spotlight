import axios from 'axios'
import * as React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControlLabel,
    Icon,
    TextField
} from '@material-ui/core'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { IStaffUser } from '../../types/auth'

import { LoadingButton } from '../Form/LoadingButton'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface IChip {
    label: string,
    value: string
}

const chips: IChip[] = [
    { label: 'Unexpected Behavior', value: 'unexpected-behavior' },
    { label: 'New Feature', value: 'new-feature' },
    { label: 'Permissions', value: 'permissions' },
    { label: 'Connectivity', value: 'connectivity' },
    { label: 'Other', value: 'other' }
]

const initialState: IState = {
    inputValue: '',
    selectedChips: [],
    allowReply: true,
    uploading: false
}

interface IReduxProps {
	currentUser: IStaffUser
	queueSnackbar: (snackbar: ISnackbar) => void
}

interface IProps extends IReduxProps {
    open: boolean
    onClose: () => void
}

interface IState {
    inputValue: string
    selectedChips: string[]
    allowReply: boolean
    uploading: boolean
}

class FeedbackDialog extends React.Component<IProps, IState> {
    state: IState = initialState

    handleInputChange = (event: any) => {
        this.setState({ inputValue: event.target.value })
    }

    handleSelectChip = (value: string) => {
        this.setState((state: IState) => {
            return { selectedChips: [...state.selectedChips, value] }
        })
    }

    handleDeselectChip = (value: string) => {
        this.setState((state: IState) => {
            return { selectedChips: state.selectedChips.filter((chipValue: string) => chipValue !== value) }
        })
    }

    toggleChecked = () => {
        this.setState((state: IState) => {
            return { allowReply: !state.allowReply }
        })
    }

    handleSubmit = (event: any) => {
        const data = {
            allow_response: this.state.allowReply,
            feedback: this.state.inputValue,
            tags: this.state.selectedChips.join(','),
            email: this.props.currentUser.details.email
        }
        this.setState({ uploading: true })
        axios.post('/api/feedback', data)
            .then((res: any) => {
                this.setState(initialState)
                this.props.onClose()
                this.props.queueSnackbar({ message: 'Thanks for your feedback!' })
            })
    }

    render() {
        return (
            <Dialog open={this.props.open}>
                <EnhancedDialogTitle title='Provide Feedback' onClose={this.props.onClose}/>
                <DialogContent>
                    {/* tslint:disable-next-line: max-line-length */}
                    <DialogContentText>We take feedback seriously to ensure Spotlight meets your school's needs.</DialogContentText>
                    <div className='chips_container'>
                        {chips.map((chip: IChip, index: number) => {
                            const selected: boolean = this.state.selectedChips.includes(chip.value)
                            return (
                                <Chip
                                    onClick={() => {
                                        selected
                                            ? this.handleDeselectChip(chip.value)
                                            : this.handleSelectChip(chip.value)
                                    }}
                                    variant={selected ? 'default' : 'outlined'}
                                    onDelete={selected ? () => null : undefined}
                                    deleteIcon={selected ? <Icon>done</Icon> : undefined}
                                    label={chip.label}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                    <TextField
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        placeholder='Describe your issue or idea'
                        label='Feedback'
                        variant='filled'
                        fullWidth
                        autoFocus
                        multiline
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.allowReply}
                                onChange={() => this.toggleChecked()}
                                color='primary'
                            />
                        }
                        label='Allow Spotlight to contacted me in response to my feedback'
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='text' onClick={() => this.props.onClose()}>Cancel</Button>
                    <LoadingButton
                        loading={this.state.uploading}
                        variant='contained'
                        color='primary'
                        onClick={this.handleSubmit}
                    >Send</LoadingButton>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state: any) => ({
	currentUser: state.auth.user
})

const mapDispatchToProps = { queueSnackbar }

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDialog)
