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
    TextField
} from '@material-ui/core'

import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { IStaff, IStaffTitle } from '../../types/staff';
import { Tabs } from '../TopNav'
import { UploadUserForm, IListItem } from '../Form/UploadUserForm'
import { isEmpty } from '../../utils/utils'

interface IProps {
    edit?: boolean
    open: boolean
    staffDetails?: IStaff
    onClose: () => void
    onSubmit: () => void
}

const TITLES: IStaffTitle[] = ['Dr.', 'Miss', 'Ms.', 'Mlle.', 'Mme.', 'Mr.', 'Mrs.', 'Prof.']

const emptyStaffDetails: IStaff = {
    id: 0,
    name: '',
    email: '',
    first_name: '',
    last_name: '',
    title: 'Mr.',
    initials: '',
    account_type: 'teacher',
    color: 'blue',
    administrator: false
}

const defaultListItems: IListItem[] = [
    { label: 'Email Address', value: 'email' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'First Name', value: 'first_name' },
    { label: 'Title', value: 'title' },
]

export const StaffInfoDialog = (props: IProps) => {
    // Cast undefined props.edit as boolean; Ensure props.studentDetails aren't empty.
    const edit: boolean = props.edit !== false && !isEmpty(props.staffDetails)
    
	const [tab, setTab]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0)

    const [details, setDetails]: [IStaff, React.Dispatch<React.SetStateAction<IStaff>>]
        = React.useState(edit ? props.staffDetails : emptyStaffDetails)

    const handleInputChange = (name: string, value: string | number | boolean) => {
        setDetails({
            ...details,
            [name]: value
        })
    }

    const handleTabChange = (event: any, value: number) => {
        setTab(value)
    }

    const navTabs: Tabs = {
        value: tab,
        onChange: handleTabChange,
        tabs: ['Single', 'File Upload']
    }

    const SingleForm = (
        <DialogContent>
            <form className='dialog-form' onSubmit={props.onSubmit} autoComplete='off'>
                <TextField
                    name='email'
                    label='Email Address'
                    value={details.email}
                    onChange={(event: any) => handleInputChange('email', event.target.value)}
                    className='text-field'
                    required
                    margin='normal'
                    fullWidth
                    type='text'
                    variant='outlined'
                />
                <div className='dialog-form__row'>
                    <TextField
                        name='title'
                        id='title'
                        select
                        variant='outlined'
                        label='Title'
                        margin='normal'
                        fullWidth
                        onChange={(event: any) => handleInputChange('title', event.target.value)}
                        value={details.title}
                        required
                    >
                        {TITLES.map((title: string, index: number) => (
                            <MenuItem value={title} key={index}>{title}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name='last_name'
                        label='Last Name'
                        value={details.last_name}
                        onChange={(event: any) => handleInputChange('last_name', event.target.value)}
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
                        onChange={(event: any) => handleInputChange('first_name', event.target.value)}
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
                            onChange={() => handleInputChange('administrator', !details.administrator)}
                            color='primary'
                        />
                    }
                    label='Administrator'
                />
                <DialogActions>
                    <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                    <Button variant='contained' color='primary' type='submit'>{edit ? 'Update' : 'Add Staff'}</Button>
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
