import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    TextField
} from '@material-ui/core'

import { fetchStaff } from '../../../actions/staffActions'
import { IStaff } from '../../../types/staff'

import ChipSelect, { ISelectChip, ISelectItem } from '../../ChipSelect'

interface IState {
    loadingStaff: boolean
    message: string
    recipients: Array<ISelectChip<number>>
    queryResults: Array<ISelectItem<number>>
}

interface IReduxProps {
    staff: IStaff[]
    fetchStaff: () => Promise<any>
}

interface IProps extends IReduxProps {
    onSubmit: (message: string, recipientIds: number[]) => void
    onCancel: () => void
}

class NotificationDispatchWidget extends React.Component<IProps, IState> {
    state: IState = {
        loadingStaff: false,
        message: '',
        recipients: [],
        queryResults: []
    }

    handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.setState({ message: event.target.value })
    }

    handleSendNotification = () => {
        const recipientIds: number[] = this.state.recipients.map((chip: ISelectChip<number>) => chip.value)
        this.props.onSubmit(this.state.message, recipientIds)
    }

    handleCancel = () => {
        this.props.onCancel()
    }

    handleRemoveRecipient = (index: number) => {
        this.setState((state: IState) => ({
            recipients: state.recipients
        }))
    }

    handleSelectRecipient = (id: number) => {
        //
    }

    handleQueryChange = (query: string) => {
        if (!query) {
            return
        }
        // console.log('query:', query)
        // console.log('FILTER:', this.props.staff.filter((staff: IStaff) => ))
        if (this.props.staff && this.props.staff.length > 0) {
            this.setState({
                queryResults: this.props.staff
                    .filter((staff: IStaff) => (
                        staff.first_name.startsWith(query)
                        || staff.last_name.startsWith(query)
                        || staff.first_name.includes(query)
                        || staff.last_name.includes(query)
                    ))
                    .slice(0, 5)
                    .map((staff: IStaff) => ({
                        avatar: { color: staff.color, initials: staff.initials },
                        label: staff.name,
                        value: staff.id,
                        selected: this.state.recipients.some((recipient: ISelectChip<number>) => recipient.value === staff.id)
                    }))
                    
            })
        }
    }

    componentDidMount() {
        this.setState({ loadingStaff: true })
        this.props.fetchStaff().then(() => {
            this.setState({ loadingStaff: false })
        })
    }

    render() {
        console.log('STAFF:', this.props.staff)
        return (
            <div>
                <ChipSelect<number>
                    chips={[]}
                    onRemoveChip={this.handleRemoveRecipient}
                    onSelect={this.handleSelectRecipient}
                    queryResults={this.state.queryResults}
                    placeholder='Recipients'
                    onSearch={this.handleQueryChange}
                />
                <div className='notifications_modal__textfield'>
                    <TextField
                        value={this.state.message}
                        onChange={this.handleChangeMessage}
                        variant='outlined'
                        color='primary'
                        multiline
                        fullWidth
                        placeholder='Compose your Notification'
                        label='Message'
                    />
                </div>
                <div className='notifications_modal__actions'>
                    <Button
                        color='primary'
                        variant='text'
                        disabled={this.state.message.length === 0}
                        onClick={() => this.handleSendNotification()}
                    >Send</Button>
                    <Button onClick={() => this.handleCancel()}>Cancel</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    staff: state.staff.items
})

const mapDispatchToProps = { fetchStaff }

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDispatchWidget)
