import * as React from 'react'

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
import { IStudentDetails } from '../../types/student';
import { Tabs } from '../TopNav'
import { isEmpty } from '../../utils/utils'

const GRADES = [9, 10, 11, 12]

interface IProps {
    edit?: boolean
    open: boolean
    studentDetails?: IStudentDetails
    onClose: () => void
    onSubmit: () => void
}

const emptyStudentDetails: IStudentDetails = {
    id: 0,
    first_name: '',
    last_name: '',
    grade: 0,
    student_number: 0,
}

export const StudentInfoDialog = (props: IProps) => {
    // Cast undefined props.edit as boolean; Ensure props.studentDetails aren't empty.
    const edit: boolean = props.edit !== false && !isEmpty(props.studentDetails)
    
	const [tab, setTab]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0)

    const [details, setDetails]: [IStudentDetails, React.Dispatch<React.SetStateAction<IStudentDetails>>]
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

    const navTabs: Tabs = {
        value: tab,
        onChange: handleTabChange,
        tabs: ['Single', 'File Upload']
    }

    return (
        <Dialog
            open={props.open}
            scroll='paper'
            aria-labelledby='student-dialog-title'
        >
            <EnhancedDialogTitle
                id='student-dialog-title'
                onClose={props.onClose}
                tabs={navTabs}
                title={props.edit ? 'Edit Student' : 'Add Student'}
            />
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
                    <FormControl>
                        <InputLabel shrink htmlFor='grade'>Grade</InputLabel>
                        <Select
                            name='grade'
                            id='grade'
                            onChange={handleInputChange}
                            value={details.grade}
                            required
                        >
                            {GRADES.map((grade: number) => (
                                <MenuItem value={grade}>{`Grade ${grade}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                        <Button variant='contained' color='primary' type='submit'>Add Student</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}
