import React from 'react'

import {
    Button,
    Checkbox,
    Icon,
    MenuItem,
    Paper,
    Radio,
    Select,
    TextField
} from '@material-ui/core'

import {
    INewSurvey,
    ISurvey,
    ISurveyOptionQuestion,
    ISurveyQuestion,
    ISurveyTextQuestion,
    SurveyOptionQuestionVariant,
    SurveyTextQuestionVariant
} from '../../types/survey'

import Form, { FormRow } from '../Form'
import TitleField from '../Form/Components/TitleField'

interface ISurveyEditorProps {
    survey: INewSurvey
    onChange: (survey: INewSurvey) => void
}

export const newSurvey: INewSurvey = {
    name: 'Untitled Survey',
    description: '',
    questions: [
        { variant: 'radio', options: [], prompt: '', required: false }
    ]
}

class SurveyEditor extends React.Component<ISurveyEditorProps> {
    handleChangeName = (name: string) => {
        this.props.onChange({
            ...this.props.survey,
            name
        })
    }

    handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        this.props.onChange({
            ...this.props.survey,
            description: value
        })
    }

    componentDidMount() {
        if (this.props.survey) {
            this.setState({ survey: this.props.survey })
        }
    }

    render() {
        const { survey } = this.props
        return (
            <div className='survey__editor'>
                <Paper className='survey__header'>
                    <Form>
                        <FormRow>
                            <TitleField
                                placeholder='Survey name'
                                title='Edit Survey name'
                                name='survey-name'
                                value={survey.name}
                                onSubmit={this.handleChangeName}
                            />
                        </FormRow>
                        <FormRow>
                            <TextField
                                name='survey-description'
                                label='Description'
                                value={survey.description}
                                placeholder='Give a description of the Survey'
                                onChange={this.handleChangeDescription}
                                margin='dense'
                                size='medium'
                                variant='filled'
                                fullWidth
                                multiline
                            />
                        </FormRow>
                    </Form>
                </Paper>
                {survey.questions.map((question: ISurveyQuestion) => {
                    return (
                        <Paper className='survey__question'>
                            //
                        </Paper>
                    )
                })}
            </div>
        )
    }
}

export default SurveyEditor
