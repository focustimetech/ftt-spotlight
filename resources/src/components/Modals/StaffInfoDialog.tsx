import * as React from 'react'
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

import { isEmpty } from '../../utils/utils'
import { SetState } from '../../types/app'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { IStaff, IStaffTitle } from '../../types/staff';
import { LoadingButton } from '../Form/LoadingButton'
import { INavTabs } from '../TopNav'
import { UploadUserForm, IListItem } from '../Form/UploadUserForm'
import { IStaffRequest } from '../../actions/staffActions'

interface IProps {
    edit?: boolean
    open: boolean
    staffDetails?: IStaff
    onClose: () => void
    onSubmit: (event: any, staffDetails: IStaffRequest) => Promise<any>
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

    const handleInputChange = (event: any) => {
        setErrored(false)
        const { name, value } = event.target
        if (name === 'initials') {
            if (value.length > 2)
                return
            setDetails({
                ...details,
                initials: (value as string).toUpperCase()
            })
            return
        }
        if (name === 'email')
            setUserExists(false)
        const first_name: string = name === 'first_name' ? value : details.first_name
        const last_name: string = name === 'last_name' ? value : details.last_name
        let autoInitials: string = null
        if (name === 'first_name' || name === 'last_name')
            autoInitials = first_name.length > 0 || last_name.length > 0
                ? `${first_name.slice(0, 1).trim()}${last_name.slice(0, 1).trim()}`.trim().toUpperCase()
                : ''
        setDetails({
            ...details,
            [name]: value,
            initials: autoInitials === null ? details.initials : autoInitials
        })
    }

    const handleTabChange = (event: any, value: number) => {
        setTab(value)
    }

    const handleSubmit = (event: any) => {
        setUploading(true)
        props.onSubmit(event, details)
            .then(() => {
                setUploading(false)
                props.onClose()
            })
            .catch((error: any) => {
                setUploading(false)
				const errorCode = error.response.status
                switch(errorCode) {
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
                            helperText={userExists ? 'A staff member with this email address already exists.' : undefined}
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
                            onChange={handleInputChange}
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
    )
}
