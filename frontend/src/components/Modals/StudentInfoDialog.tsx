import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'

import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Icon,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemSecondaryAction,
    MenuItem,
    Select,
    Step,
    Stepper,
    StepContent,
    StepLabel,
    TextField,
} from '@material-ui/core'

import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { IStudentDetails } from '../../types/student';
import { Tabs } from '../TopNav'
import { isEmpty } from '../../utils/utils'

const GRADES = [9, 10, 11, 12]

interface IListItem {
    label: string,
    value: string
}

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
    
    const [step, setStep]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0)

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

    const listItems: IListItem[] = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Grade', value: 'grade' },
        { label: 'Student Number', value: 'student_number' },
    ]

    const reorder = (index: number, direction: 'up' | 'down') => {
        if (index === 0 && direction === 'up') {
            return
        } else if (index === listItems.length - 1 && direction === 'down') {
            return
        }
        const newIndex: number = index + (direction === 'up' ? -1 : 1)
        const tmp: IListItem = listItems[index]
        listItems[index] = listItems[newIndex]
        listItems[newIndex] = tmp
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
            <SwipeableViews index={navTabs.value}>
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
                                {GRADES.map((grade: number, index: number) => (
                                    <MenuItem value={grade} key={index}>{`Grade ${grade}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                            <Button variant='contained' color='primary' type='submit'>Add Student</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
                <DialogContent>
                    <Stepper activeStep={step} orientation='vertical'>
                        <Step key={0}>
                            <StepLabel>Choose Files</StepLabel>
                            <StepContent>
                                <FilePond allowMultiple />
                                <div className='stepper-actions'>
                                    <Button onClick={() => setStep(1)} variant='contained' color='primary'>Next</Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Field Order</StepLabel>
                            <StepContent>
                                <List>
                                    {listItems.map((listItem: IListItem, index: number) => (
                                        <ListItem key={index}>
                                            <span style={{color: 'rgba(0,0,0,0.48)', marginRight: 16, fontWeight: 500}}>{index + 1}</span>
                                            {listItem.label}
                                            <ListItemSecondaryAction>
                                                <IconButton><Icon>expand_less</Icon></IconButton>
                                                <IconButton><Icon>expand_more</Icon></IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                                <div className='stepper-actions'>
                                    <Button onClick={() => setStep(0)} variant='text'>Back</Button>
                                    <Button onClick={() => setStep(2)} variant='contained' color='primary'>Next</Button>
                                </div>
                            </StepContent>
                        </Step>
                    </Stepper>
                    
                </DialogContent>
                </SwipeableViews>
        </Dialog>
    )
}
