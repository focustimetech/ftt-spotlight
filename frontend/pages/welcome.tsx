import React from 'react'

import {
    Button,
    Icon,
    IconButton,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from '@material-ui/core'

import withAuth from '../hocs/withAuth'
import withNavigation from '../hocs/withNavigation'

interface ISetupStep {
    key: string
    label: string
    optional?: boolean
}
interface IState {
    step: number
    password: string
    oldPassword: string
    passwordComplete: boolean
    passwordConfirmation: string
}

class Welcome extends React.Component<IState> {
    state: IState = {
        step: 0,
        password: '',
        oldPassword: '',
        passwordComplete: false,
        passwordConfirmation: ''
    }

    handlePrevious = () => {
        this.setState((state: IState) => ({
            step: state.step > 0 ? state.step - 1 : state.step
        }))
    }

    handleNext = () => {
        this.setState((state: IState) => ({
            step: state.step + 1
        }))
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        const setupSteps: ISetupStep[] = [
            { key: 'password', label: 'Choose a password' },
            { key: 'account', label: 'Your account details' },
            { key: 'classroom', label: 'Your Topics', optional: true },
            { key: 'password', label: 'Choose a password' },
        ]

        const getStepContent = (key: string) => {
            switch (key) {
                case 'password':
                    return <>
                        <Typography variant='h6'>Choose a new password to secure your account.</Typography>
                        <TextField
                            variant='outlined'
                            value={this.state.oldPassword}
                            onChange={this.handleChange}
                            name='oldPassword'
                            label='Current password'
                            fullWidth
                            type='password'
                            margin='normal'
                        />
                        <TextField
                            variant='outlined'
                            value={this.state.password}
                            onChange={this.handleChange}
                            name='password'
                            label='New password'
                            fullWidth
                            type='password'
                            margin='normal'
                        />
                        <TextField
                            variant='outlined'
                            value={this.state.passwordConfirmation}
                            onChange={this.handleChange}
                            name='passwordConfirmation'
                            label='Confirm password'
                            fullWidth
                            type='password'
                            margin='normal'
                        />
                    </>
                case 'account':
                    return <>
                        <Typography variant='h6'>Make sure your account info is correct.</Typography>
                        <TextField
                            variant='outlined'

                        />
                    </>
            }
        }

        return (
            <div className='setup'>
                <div className='setup__header'>
                    <Stepper activeStep={this.state.step}>
                        {setupSteps.map((step: ISetupStep, index: number) => (
                            <Step key={index}>
                                <StepLabel optional={step.optional ? <Typography variant='caption'>Optional</Typography> : undefined}>
                                    {step.label}
                                </StepLabel>
                            </Step>
                        ))}
                        <Step key={4}><StepLabel>All done!</StepLabel></Step>
                    </Stepper>
                    <div className='setup__back'>
                        {this.state.step > (this.state.passwordComplete ? 1 : 0) && (
                            <>
                                <IconButton onClick={() => this.handlePrevious()} edge='start'>
                                    <Icon>chevron_left</Icon>
                                </IconButton>
                                <div><Typography variant='h6'>Back</Typography></div>
                            </>
                        )}
                    </div>
                </div>
                <div className='setup__content'>
                    {getStepContent(setupSteps[this.state.step].key)}
                    <Button variant='contained' color='primary' onClick={() => this.handleNext()}>Next</Button>
                </div>
            </div>
        )
    }
}

export default withNavigation(withAuth()(Welcome))
