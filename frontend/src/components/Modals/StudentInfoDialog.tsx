import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField
} from '@material-ui/core'

import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { IStudentDetails } from '../../types/student';

interface IProps {
    open: boolean
    edit?: boolean
    studentDetails?: IStudentDetails
    onClose: () => void
    onSubmit: () => void
}

export const EditStudentDialog = (props: IProps) => {
    const edit: boolean = props.edit !== false
    // Check if props.studentDetails is empty using custom isEmpty function (import this from utils). TBC
    return (
        <Dialog
            open={props.open}
            scroll='paper'
            aria-labelledby='student-dialog-title'
        >
            <EnhancedDialogTitle id='student-dialog-title' onClose={props.onClose}>Add Student</EnhancedDialogTitle>
            <DialogContent>
                <form className='dialog-form' onSubmit={props.onSubmit} autoComplete='off'>
                    <TextField
                        name='first_name'
                        label='First Name'
                        value={this.state.newStudent.first_name}
                        onChange={this.handleNewStudentChange}
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
                        value={this.state.newStudent.last_name}
                        onChange={this.handleNewStudentChange}
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
                        value={this.state.newStudent.student_number}
                        onChange={this.handleNewStudentChange}
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
                            onChange={this.handleNewStudentChange}
                            value={this.state.newStudent.grade}
                            required
                        >
                            {grades.map((grade: number) => (
                                <MenuItem value={grade}>{`Grade ${grade}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button variant='text' onClick={this.onAddDialogClose}>Cancel</Button>
                        <Button variant='contained' color='primary' type='submit'>Add Student</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}
