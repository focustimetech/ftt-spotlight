import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    FormControlLabel,
    MenuItem,
    TextField,
    Typography
} from '@material-ui/core'

import { IStaffRequest } from '../../actions/staffActions'
import { SetState } from '../../types/app'
import { IStaff, IStaffTitle } from '../../types/staff'
import { isEmpty } from '../../utils/utils'

import { LoadingButton } from '../Form/LoadingButton'
import { IListItem, UploadUserForm } from '../Form/UploadUserForm'
import { ConfirmPasswordDialog } from '../Modals/ConfirmPasswordDialog'
import { INavTabs } from '../TopNav'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface IProps {
    edit?: boolean
    open: boolean
    staffDetails?: IStaff
    onClose: () => void
    onSubmit: (event: any, staffDetails: IStaffRequest, password: string) => Promise<any>
}

const TITLES: IStaffTitle[] = ['Dr.', 'Miss', 'Ms.', 'Mlle.', 'Mme.', 'Mr.', 'Mrs.', 'Prof.']

const emptyStaffRequest: IStaffRequest = {
    email: '',
    first_name: '',
    last_name: '',
    title: 'Mr.',
    initials: '',
    administrator: false
}

const defaultListItems: IListItem[] = [
    { label: 'Email Address', value: 'email' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'First Name', value: 'first_name' },
    { label: 'Title', value: 'title' },
]

export const StaffInfoDialog = (props: IProps) => {
    const edit: boolean = props.edit !== false && !isEmpty(props.staffDetails)
    const [tab, setTab]: [number, SetState<number>] = React.useState(0)
    const [details, setDetails]: [IStaffRequest, SetState<IStaffRequest>]
        = React.useState(edit ? props.staffDetails : emptyStaffRequest)
    const [uploading, setUploading]: [boolean, SetState<boolean>] = React.useState(false)
    const [userExists, setUserExists]: [boolean, SetState<boolean>] = React.useState(false)
    const [errored, setErrored]: [boolean, SetState<boolean>] = React.useState(false)
    const [passwordDialogOpen, setPasswordDialogOpen]: [boolean, SetState<boolean>] = React.useState(false)

    const handleInputChange = (event: any) => {
        setErrored(false)
        const { name, value } = event.target
        if (name === 'initials') {
            if (value.length > 2) {
                return
            }
            setDetails({
                ...details,
                initials: (value as string).toUpperCase()
            })
            return
        }
        if (name === 'email') {
            setUserExists(false)
        }
        const firstName: string = name === 'first_name' ? value : details.first_name
        const lastName: string = name === 'last_name' ? value : details.last_name
        let autoInitials: string = null
        if (name === 'first_name' || name === 'last_name') {
            autoInitials = firstName.length > 0 || lastName.length > 0
                ? `${firstName.slice(0, 1).trim()}${lastName.slice(0, 1).trim()}`.trim().toUpperCase()
                : ''
        }
        setDetails({
            ...details,
            [name]: value,
            initials: autoInitials === null ? details.initials : autoInitials
        })
    }

    const toggleAdministrator = () => {
        setDetails({
            ...details,
            administrator: !details.administrator
        })
    }

    const handleTabChange = (event: any, value: number) => {
        setTab(value)
    }

    const handlePasswordDialogOpen = () => {
        setPasswordDialogOpen(true)
    }

    const handlePasswordDialogClose = () => {
        setPasswordDialogOpen(false)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        setPasswordDialogOpen(true)
    }

    const handleCreate = (password: string) => {
        setUploading(true)
        props.onSubmit(event, details, password)
            .then(() => {
                setUploading(false)
                props.onClose()
            })
            .catch((error: any) => {
                setUploading(false)
			    const errorCode: number = error.response.status
                switch (errorCode) {
                    case 409:
                        setUserExists(true)
                        break
                    default:
                        setErrored(true)
                        break
                }
			})
    }

    const navTabs: INavTabs = {
        value: tab,
        onChange: handleTabChange,
        tabs: ['Single', 'File Upload']
    }

    const SingleForm = (
        <DialogContent>
            <form className='dialog-form' onSubmit={handleSubmit} autoComplete='off'>
                {!edit && (
                    <TextField
                        name='email'
                        label='Email Address'
                        value={details.email}
                        onChange={handleInputChange}
                        className='text-field'
                        required
                        error={userExists}
                            helperText={
                                userExists
                                    ? 'A staff member with this email address already exists.'
                                    : undefined
                            }
                        margin='normal'
                        fullWidth
                        type='text'
                        variant='outlined'
                    />
                )}
                <div className='dialog-form__row'>
                    <TextField
                        name='last_name'
                        label='Last Name'
                        value={details.last_name}
                        onChange={handleInputChange}
                        className='text-field'
                        required
                        margin='normal'
                        fullWidth
                        type='text'
                        variant='outlined'
                    />
                    <TextField
                        name='first_name'
                        label='First Name'
                        value={details.first_name}
                        onChange={handleInputChange}
                        className='text-field'
                        required
                        margin='normal'
                        fullWidth
                        type='text'
                        variant='outlined'
                    />
                </div>
                <div className='dialog-form__row'>
                    <TextField
                        name='title'
                        id='title'
                        select
                        variant='outlined'
                        label='Title'
                        margin='normal'
                        fullWidth
                        onChange={handleInputChange}
                        value={details.title}
                        required
                    >
                        {TITLES.map((title: string, index: number) => (
                            <MenuItem value={title} key={index}>{title}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name='initials'
                        label='Initials'
                        value={details.initials}
                        onChange={handleInputChange}
                        className='text-field'
                        required
                        margin='normal'
                        fullWidth
                        type='text'
                        variant='outlined'
                    />
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            value={details.administrator}
                            name='administrator'
                            checked={details.administrator}
                            onChange={() => toggleAdministrator()}
                            color='primary'
                        />
                    }
                    label='Administrator'
                />
                {errored && (
                    <Typography variant='subtitle1' color='error'>Something went wrong. Please try again.</Typography>
                )}
                <DialogActions>
                    <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                    <LoadingButton
                        loading={uploading}
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        {edit ? 'Update' : 'Add Staff'}
                    </LoadingButton>
                </DialogActions>
            </form>
        </DialogContent>
    )

    return (
        <>
            <ConfirmPasswordDialog
                open={passwordDialogOpen}
                onClose={handlePasswordDialogClose}
                onSubmit={handleCreate}
                actionItems={['Create staff accounts']}
            />
            <Dialog
                open={props.open}
                scroll='paper'
                aria-labelledby='student-dialog-title'
            >
                <EnhancedDialogTitle
                    id='student-dialog-title'
                    onClose={props.onClose}
                    tabs={!edit && navTabs}
                    title={props.edit ? 'Edit Staff' : 'Add Staff'}
                />
                {edit ? SingleForm : (
                    <SwipeableViews index={navTabs.value}>
                        {SingleForm}
                        <UploadUserForm
                            onClose={props.onClose}
                            headers={defaultListItems}
                            userType='staff'
                        />
                    </SwipeableViews>
                )}
            </Dialog>
        </>
    )
}
