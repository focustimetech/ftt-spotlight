export interface ISurvey {
    id: number
    name: string
    description: string
    questions: ISurveyQuestion[]
}

export type INewSurvey = Omit<ISurvey, 'id'>

export type ISurveyQuestion = (ISurveyTextQuestion | ISurveyOptionQuestion) & {
    prompt: string
    required: boolean
}

export type SurveyTextQuestionVariant = 'long' | 'short'

export interface ISurveyTextQuestion {
    variant: SurveyTextQuestionVariant
}

export type SurveyOptionQuestionVariant = 'radio' | 'checkbox' | 'select'

export interface ISurveyOptionQuestion {
    variant: SurveyOptionQuestionVariant
    options: string[]
    correctOptions?: number[]
}
