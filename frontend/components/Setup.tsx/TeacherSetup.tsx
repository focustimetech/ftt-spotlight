import React from 'react'

import {
    TextField,
    Typography
} from '@material-ui/core'

import { ISetupProps, ISetupStep } from '../../types/setup'

import Form from '../Form/Form'
import FormRow from '../Form/FormRow'

const teacherSetupSteps: ISetupStep[] = [
    { key: 'details', label: 'About you' },
    { key: 'classrooms', label: 'Your Classrooms' },
    { key: 'topics', label: 'Your Topics' }
]

class TeacherSetup extends React.Component<ISetupProps> {
    render() {
        const { key } = this.props
        switch (key) {
            case 'details':
                return <>
                    <Typography variant='h6'>Make sure the account details we have for you are correct.</Typography>
                    <Form>
                        <FormRow></FormRow>
                    </Form>
                </>
            case 'classrooms':
                return <>

                </>
            case 'topcis':
                return <>

                </>
        }
    }
}

export default TeacherSetup
