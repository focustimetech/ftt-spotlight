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

import { LoadingButton } from '../Form/LoadingButton'
import { verifyPassword } from '../../utils/utils'
// import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface IProps {
    open: boolean
    onClose: () => void
    onSubmit: (password: string) => void
}

export const ConfirmPasswordDialog = (props: IProps) => {
    const [password, setPassword]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState('')
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false)

    const handleAuthorization = () => {
        setLoading(true)
        verifyPassword(password)
            .then((res: any) => {
                console.log('RES:', res)
                setLoading(false)
            })
            .catch((reason: any) => {
                setLoading(false)
            })
        return
    }

    return (
        <Dialog open={props.open} onExited={() => setPassword('')}>
            <DialogTitle>Confirm Authorization</DialogTitle>
            <DialogContent>
                <DialogContentText>This action requires you to confirm your password.</DialogContentText>
                <TextField
                    name='password'
                    value={password}
                    onChange={(event: any) => setPassword(event.target.value)}
                    variant='outlined'
                    type='password'
                    label="Password"
                    fullWidth
                    required
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
        </Dialog>
    )
}