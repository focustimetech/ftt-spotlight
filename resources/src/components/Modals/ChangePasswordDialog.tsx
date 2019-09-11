import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Icon,
    IconButton,
    InputAdornment,
    TextField
} from '@material-ui/core'

import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { LoadingButton } from '../Form/LoadingButton'
import { changePassword } from '../../utils/http'

interface IProps {
    open: boolean
    onClose: () => void
    onSuccess: () => void
}

export const ChangePasswordDialog = (props: IProps) => {
    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [errored, setErrored] = React.useState(false)
    const [passwordTooShort, setPasswordTooShort] = React.useState(false)
    const [unmatchedPasswords, setUnmatchedPasswords] = React.useState(false)

    const handleSubmit = () => {
        if (newPassword.length < 8) {
            setPasswordTooShort(true)
            return
        } else if (!showPassword && newPassword !== confirmPassword) {
            setUnmatchedPasswords(true)
            return
        }
        setLoading(true)
        setErrored(false)
        changePassword(oldPassword, newPassword)
            .then((res: any) => {
                setLoading(false)
                props.onSuccess()
                props.onClose()
            })
            .catch((error: any) => {
                setLoading(false)
                setErrored(true)
            })
    }

    const handleChange = (event: any, field: 'old' | 'new' | 'confirm') => {
        if (loading)
            return
        const value: string = event.target.value
        setErrored(false)
        switch (field) {
            case 'old':
                setOldPassword(value)
                return
            case 'new':
                setPasswordTooShort(false)
                setNewPassword(value)
                return
            case 'confirm':
                setConfirmPassword(value)
                setUnmatchedPasswords(false)
                return
        }
    }

    const toggleShowPassword = () => {
        if (loading)
            return
        if (showPassword) {
            setShowPassword(false)
            setConfirmPassword('')
        } else {
            setShowPassword(true)
        }
    }

    return (
        <Dialog open={props.open}>
            <EnhancedDialogTitle title='Change Password' onClose={props.onClose} />
            <DialogContent>
                <DialogContentText>Enter your old password, followed by your new password. Passwords must be at least 8 characters long.</DialogContentText>
                <TextField
                    name='old_password'
                    label='Old Password'
                    variant='outlined'
                    type='password'
                    value={oldPassword}
                    onChange={(event: any) => handleChange(event, 'old')}
                    fullWidth
                    autoFocus
                    required
                    error={errored}
                    helperText={errored ? 'That didn\'t work. Please try again.' : undefined}
                    margin='normal'
                />
                <TextField
                    name='new_password'
                    label='New Password'
                    variant='outlined'
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(event: any) => handleChange(event, 'new')}
                    fullWidth
                    required
                    error={passwordTooShort}
                    helperText={passwordTooShort ? 'Password must be at least 8 characters.' : undefined}
                    margin='normal'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => toggleShowPassword()}
                                >
                                    <Icon>{showPassword ? 'visibility_off' : 'visibility'}</Icon>
                                </IconButton>
                            </InputAdornment>
                        ),
                      }}
                />
                {!showPassword && (
                    <TextField
                        name='confirm_password'
                        label='Confirm Password'
                        variant='outlined'
                        type='password'
                        value={confirmPassword}
                        onChange={(event: any) => handleChange(event, 'confirm')}
                        fullWidth
                        required={!showPassword}
                        error={unmatchedPasswords}
                        helperText={unmatchedPasswords ? 'Passwords don\'t match.' : undefined}
                        margin='normal'
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                <LoadingButton
                    variant='contained'
                    color='primary'
                    onClick={() => handleSubmit()}
                    loading={loading}
                    disabled={oldPassword.length === 0 || newPassword.length === 0}
                >Submit</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
