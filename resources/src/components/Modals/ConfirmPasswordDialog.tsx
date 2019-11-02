import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core'

import { verifyPassword } from '../../utils/http'
import { LoadingButton } from '../Form/LoadingButton'

interface IProps {
    open: boolean
    actionItems?: string[]
    dialogTitle?: string
    onClose: () => void
    onSubmit?: (password: string) => void
    onVerification?: () => Promise<any>
}

export const ConfirmPasswordDialog = (props: IProps) => {
    const helperText: string = "That didn't work. Please try again."
    const [password, setPassword]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState('')
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false)
    const [errored, setErrored]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false)

    const handleAuthorization = () => {
        setLoading(true)
        setErrored(false)
        verifyPassword(password)
            .then((res: any) => {
                if (props.onVerification) {
                    props.onVerification().then(() => {
                        handleCompletion()
                    })
                } else {
                    handleCompletion()
                }
            })
            .catch((reason: any) => {
                setLoading(false)
                setErrored(true)
            })
        return
    }

    const handleChange = (event: any) => {
        event.preventDefault()
        setPassword(event.target.value)
        setErrored(false)
    }

    const handleCompletion = () => {
        setLoading(false)
        props.onClose()
        if (props.onSubmit) {
            props.onSubmit(password)
        }
    }

    const onExited = () => {
        setPassword('')
        setErrored(false)
    }

    return (
        <Dialog open={props.open} onExited={() => onExited()}>
            <DialogTitle>{props.dialogTitle || 'Confirm Authorization'}</DialogTitle>
            <form autoComplete={'off'}>
                <DialogContent>
                    <DialogContentText>
                        {props.actionItems ? (
                            'Please confirm your password to perform the following actions:'
                        ) : (
                            'This action requires you to confirm your password.'
                        )}
                    </DialogContentText>
                    {props.actionItems && (
                        <ul className='password_confirm_dialog_list'>
                            {props.actionItems.map((actionItem: string, index: number) => (
                                <li key={index}>{actionItem}</li>
                            ))}
                        </ul>
                    )}
                    <TextField
                        name='password'
                        value={password}
                        onChange={handleChange}
                        disabled={loading}
                        error={errored}
                        helperText={errored ? helperText : undefined}
                        variant='outlined'
                        type='password'
                        label='Password'
                        fullWidth
                        required
                        autoFocus
                        margin='normal'
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                    <LoadingButton
                        type='submit'
                        loading={loading}
                        variant='text'
                        color='primary'
                        disabled={password.length === 0}
                        onClick={() => handleAuthorization()}
                    >Continue</LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    )
}
