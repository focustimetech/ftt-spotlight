import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    MenuItem,
    TextField,
    Typography
} from '@material-ui/core'

import { IStudent } from '../../types/student'
import { isEmpty } from '../../utils/utils'
import { INavTabs } from '../TopNav'

import { LoadingButton } from '../Form/LoadingButton'
import { IListItem, UploadUserForm } from '../Form/UploadUserForm'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface IProps {
    edit?: boolean
    open: boolean
    studentDetails?: IStudent
    onClose: () => void
    onSubmit: (event: any, studentDetails: IStudent) => Promise<any>
}

const GRADES: number[] = [8, 9, 10, 11, 12]

const emptyStudentDetails: IStudent = {
    id: 0,
    first_name: '',
    last_name: '',
    grade: GRADES[0],
    student_number: null,
    initials: ''
}

const defaultListItems: IListItem[] = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Grade', value: 'grade' },
    { label: 'Student Number', value: 'student_number' },
]

export const StudentInfoDialog = (props: IProps) => {
    // Cast undefined props.edit as boolean; Ensure props.studentDetails aren't empty.
    const edit: boolean = props.edit !== false && !isEmpty(props.studentDetails)
    const [tab, setTab]: [number, React.Dispatch<React.SetStateAction<number>>]
        = React.useState(0)
    const [details, setDetails]: [IStudent, React.Dispatch<React.SetStateAction<IStudent>>]
        = React.useState(edit ? props.studentDetails : emptyStudentDetails)
    const [uploading, setUploading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [errored, setErrored]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [userExists, setUserExists]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)

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
        if (name === 'student_number') {
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
                    {!edit && (
                        <TextField
                            name='student_number'
                            label='Student Number'
                            value={details.student_number}
                            onChange={handleInputChange}
                            className='text-field'
                            required
                            error={userExists}
                            helperText={userExists ? 'A student with this student number already exists.' : undefined}
                            margin='normal'
                            fullWidth
                            type='text'
                            variant='outlined'
                        />
                    )}
                    <TextField
                        name='grade'
                        id='grade'
                        select
                        variant='outlined'
                        label='Grade'
                        margin='normal'
                        fullWidth
                        onChange={handleInputChange}
                        value={details.grade}
                        required
                    >
                        {GRADES.map((grade: number) => (
                            <MenuItem value={grade} key={grade}>{`Grade ${grade}`}</MenuItem>
                        ))}
                    </TextField>
                </div>
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
                    >{edit ? 'Update' : 'Add Student'}</LoadingButton>
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
                title={props.edit ? 'Edit Student' : 'Add Student'}
            />
            {edit ? SingleForm : (
                <SwipeableViews index={navTabs.value}>
                    {SingleForm}
                    <UploadUserForm
                        onClose={props.onClose}
                        headers={defaultListItems}
                        userType='student'
                    />
                </SwipeableViews>
            )}
        </Dialog>
    )
}
