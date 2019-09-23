import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core'

import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { IStudent } from '../../types/student';
import { INavTabs } from '../TopNav'
import { UploadUserForm, IListItem } from '../Form/UploadUserForm'
import { isEmpty } from '../../utils/utils'

interface IProps {
    edit?: boolean
    open: boolean
    studentDetails?: IStudent
    onClose: () => void
    onSubmit: () => void
}

const GRADES: number[] = [8, 9, 10, 11, 12]

const emptyStudentDetails: IStudent = {
    id: 0,
    first_name: '',
    last_name: '',
    grade: GRADES[0],
    student_number: 0,
    color: 'blue',
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
    
	const [tab, setTab]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0)

    const [details, setDetails]: [IStudent, React.Dispatch<React.SetStateAction<IStudent>>]
        = React.useState(edit ? props.studentDetails : emptyStudentDetails)

    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setDetails({
            ...details,
            [name]: value
        })
    }

    const handleTabChange = (event: any, value: number) => {
        setTab(value)
    }

    const navTabs: INavTabs = {
        value: tab,
        onChange: handleTabChange,
        tabs: ['Single', 'File Upload']
    }

    const SingleForm = (
        <DialogContent>
            <form className='dialog-form' onSubmit={props.onSubmit} autoComplete='off'>
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
                {details.student_number && (
                    <TextField
                        name='student_number'
                        label='Student Number'
                        value={details.student_number}
                        onChange={handleInputChange}
                        className='text-field'
                        required
                        margin='normal'
                        fullWidth
                        type='text'
                        variant='outlined'
                    />
                )}
                <FormControl>
                    <InputLabel shrink htmlFor='grade'>Grade</InputLabel>
                    <Select
                        name='grade'
                        id='grade'
                        onChange={handleInputChange}
                        value={details.grade}
                        required
                    >
                        {GRADES.map((grade: number, index: number) => (
                            <MenuItem value={grade} key={index}>{`Grade ${grade}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DialogActions>
                    <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                    <Button variant='contained' color='primary' type='submit'>{edit ? 'Update' : 'Add Student'}</Button>
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
