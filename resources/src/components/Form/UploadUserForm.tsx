import * as React from 'react'
import { FilePond as IFilePond, File as FilePondFile } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    Step,
    Stepper,
    StepContent,
    StepLabel,
    Tooltip
} from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles';

import { LoadingButton } from '../Form/LoadingButton'
import { uploadCSV, UserType } from '../../utils/storage'
import { ConfirmPasswordDialog } from '../Modals/ConfirmPasswordDialog';

type ActualFileObject = FilePondFile['file']


export interface IListItem {
    label: string
    value: string
}

interface IProps {
    headers: IListItem[]
    userType: UserType
    onClose: () => void
}

export const UploadUserForm = (props: IProps) => {

    const [step, setStep]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0)
    
    const [files, setFiles]: [ActualFileObject[], React.Dispatch<React.SetStateAction<ActualFileObject[]>>]
        = React.useState([])

    const [listItems, setListItems]: [IListItem[], React.Dispatch<React.SetStateAction<IListItem[]>>]
        = React.useState(props.headers)
    
    const [uploading, setUploading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false)

    const [passwordDialogOpen, setPasswordDialogOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)

    const FilePond: any = IFilePond

    const swapIndices = (previous: number, next: number) => {
        if (previous === next
            || previous > listItems.length - 1
            || next > listItems.length - 1
            || previous < 0
            || next < 0
        ) {
            return
        }
        const newListItems: IListItem[] = [...listItems]
        newListItems[previous] = listItems[next]
        newListItems[next] = listItems[previous]
        setListItems(newListItems)
    }

    const handleFileChange = (fileItems: FilePondFile[]) => {
        setFiles(fileItems.map((fileItem: FilePondFile) => fileItem.file))
    }

    const handleFileUpload = (password: string) => {
        setUploading(true)
        const headers: string[] = listItems.map((listItem: IListItem) => (listItem.value))
        try {
            uploadCSV(files.map((file: ActualFileObject) => file as File), headers, props.userType, password)
                .then(() => {
                    setUploading(false)
                    setFiles([])
                    setStep(3)
                })
        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <>
            <ConfirmPasswordDialog
                open={passwordDialogOpen}
                onSubmit={(password: string) => handleFileUpload(password)}
                onClose={() => setPasswordDialogOpen(false)}
            />
            <DialogContent>
                <Stepper activeStep={step} orientation='vertical'>
                    <Step key={0}>
                        <StepLabel>Choose Files</StepLabel>
                        <StepContent>
                            <p>Select up to five CSV files to create Student accounts. Ensure that all files have identical column ordering.</p>
                            <FilePond
                                files={files}
                                onupdatefiles={handleFileChange}
                                allowMultiple
                                maxFiles={5}
                            />
                            <div className='stepper-actions'>
                                <Button disabled={files.length === 0} onClick={() => setStep(1)} variant='contained' color='primary'>Next</Button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Field Order</StepLabel>
                        <StepContent>
                            <p>Order the list of fields below as they appear in the CSV file columns.</p>
                            <List>
                                {listItems.map((listItem: IListItem, index: number) => {
                                    const spanStyle: CSSProperties = {
                                        color: 'rgba(0,0,0,0.48)',
                                        marginRight: 16,
                                        fontWeight: 500,
                                        fontVariantNumeric: 'tabular-nums'
                                    }
                                    const buttonUp = (
                                        <IconButton onClick={() => swapIndices(index, index - 1)} disabled={index <= 0}>
                                            <Icon>expand_less</Icon>
                                        </IconButton>
                                    )
                                    const buttonDown = (
                                        <IconButton onClick={() => swapIndices(index, index + 1)} disabled={index >= listItems.length - 1}>
                                            <Icon>expand_more</Icon>
                                        </IconButton>
                                    )
                                    return (
                                        <ListItem key={index}>
                                            <span style={spanStyle}>{index + 1}</span>
                                            {listItem.label}
                                            <ListItemSecondaryAction>
                                                {index >= 0 ? buttonUp : <Tooltip title='Move Up'>{buttonUp}</Tooltip>}
                                                {index >= listItems.length - 1 ? buttonDown : <Tooltip title='Move Down'>{buttonDown}</Tooltip>}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })}
                            </List>
                            <div className='stepper-actions'>
                                <Button onClick={() => setStep(0)} variant='text'>Back</Button>
                                <Button onClick={() => setStep(2)} variant='contained' color='primary'>Next</Button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Submit Files</StepLabel>
                        <StepContent>
                            <p>When you're ready, click <span style={{fontWeight: 500}}>Upload</span> to send your CSV files.</p>
                            <div className='stepper-actions'>
                                <Button onClick={() => setStep(1)} variant='text'>Back</Button>
                                <LoadingButton
                                    onClick={() => setPasswordDialogOpen(true)}
                                    variant='contained'
                                    color='primary'
                                    loading={uploading}
                                >Upload</LoadingButton>
                            </div>
                        </StepContent>
                    </Step>
                    <Step completed={step >= 3}>
                        <StepLabel>Done</StepLabel>
                        <StepContent>
                            <p>All done! We'll take it from here. You'll receive a notification once all CSVs have been processed.</p>
                            <DialogActions>
                                <Button onClick={() => setStep(0)} variant='contained' color='primary'>Add More</Button>
                                <Button onClick={() => props.onClose()} variant='text'>Close</Button>
                            </DialogActions>
                        </StepContent>
                    </Step>
                </Stepper>
            </DialogContent>
        </>
    )
}