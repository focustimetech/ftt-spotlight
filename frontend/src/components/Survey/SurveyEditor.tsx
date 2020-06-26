import React from 'react'

import {
    Button,
    Checkbox,
    Icon,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Radio,
    Select,
    TextField,
    Typography
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

type SurveyEditorQuestionVariant =
    | 'short_text'
    | 'notes'
    | 'radio_button_checked'
    | 'check_box'
    | 'arrow_drop_down_circle'

const editorVariants: Record<SurveyEditorQuestionVariant, string> = {
    short_text: 'Short answer',
    notes: 'Long answer',
    radio_button_checked: 'Radio',
    check_box: 'Checkbox',
    arrow_drop_down_circle: 'Dropdown'
}

import Form, { FormRow, FormRowElement } from '../Form'
import TitleField from '../Form/Components/TitleField'
import Flexbox from '../Layout/Flexbox'

interface ISurveyEditorProps {
    survey: INewSurvey
    onChange: (survey: INewSurvey) => void
}

export const newSurvey: INewSurvey = {
    name: 'Untitled Survey',
    description: '',
    questions: [
        { variant: 'radio', options: ['Option 1'], prompt: '', required: false }
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

    handleChangeQuestionPrompt = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
        const { value } = event.target
        const questions = [...this.props.survey.questions]
        questions[index] = {
            ...questions[index],
            prompt: value
        }
        this.props.onChange({ ...this.props.survey, questions })
    }

    handleChangeQuestionVariant = (event: React.ChangeEvent<{ name?: string; value: SurveyEditorQuestionVariant; }>, index: number) => {
        const { value } = event.target
        const questions = [...this.props.survey.questions]
        const wasText: boolean = questions[index].variant === ''
        questions[index] = {
            ...questions[index],
            prompt: value
        }
        this.props.onChange({ ...this.props.survey, questions })
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
                                fullWidth
                                multiline
                            />
                        </FormRow>
                    </Form>
                </Paper>
                {survey.questions.map((question: ISurveyQuestion, questionIndex: number) => {
                    const questionVariant: SurveyEditorQuestionVariant = 'short_text'
                    return (
                        <Paper className='survey__question'>
                            <Form>
                                <FormRow alignItems='flex-start'>
                                    <FormRowElement fullWidth>
                                        <TextField
                                            name={`survey-question-prompt${questionIndex}`}
                                            value={survey.questions[questionIndex].prompt}
                                            placeholder={`Question ${questionIndex + 1}`}
                                            onChange={(event) => this.handleChangeQuestionPrompt(event, questionIndex)}
                                            margin='dense'
                                            fullWidth
                                            multiline
                                        />
                                    </FormRowElement>
                                    <FormRowElement>
                                        <Select
                                            margin='dense'
                                            value={questionVariant}
                                            variant='outlined'
                                            renderValue={(value: SurveyEditorQuestionVariant) => (
                                                <Flexbox><Icon>{value}</Icon><Typography variant='inherit'>{editorVariants[value]}</Typography></Flexbox>
                                            )}
                                            onChange={(event) => this.handleChangeQuestionVariant(event, questionIndex)}
                                        >
                                            {Object.keys(editorVariants).map((variant: SurveyEditorQuestionVariant) => (
                                                <MenuItem value={variant}>
                                                    <ListItemIcon><Icon>{variant}</Icon></ListItemIcon><ListItemText>{editorVariants[variant]}</ListItemText>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormRowElement>
                                </FormRow>
                            </Form>
                        </Paper>
                    )
                })}
            </div>
        )
    }
}

export default SurveyEditor
