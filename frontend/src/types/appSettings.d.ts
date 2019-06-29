export interface ISettingsGroup {
    name: string
    description: string
    settings: ISetting[]
}

type ISettingType = 'string' | 'boolean' | 'number'

export interface ISetting {
    id: number,
    key: string,
    value: any,
    type: ISettingType,
    description: string,
    min?: number,
    max?: number
}
