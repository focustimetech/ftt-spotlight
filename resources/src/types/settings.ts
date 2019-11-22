export interface ISettingsGroup {
    name: string
    description: string
    settings: ISetting[]
}

export type SettingType =
    | 'string'
    | 'boolean'
    | 'numeric'
    | 'datetime'

export type SettingKey =
    | 'school_name'
    | 'school_logo'
    | 'start_datetime'
    | 'end_datetime'
    | 'weekends'
    | 'include_days'
    | 'air-check-in'
    | 'appointment_limit'

interface ISettingDetails {
    id: number
    key: SettingKey
    description: string
}

export interface IStringSetting {
    type: 'string'
    value: string
}

export interface INumericSetting {
    type: 'numeric'
    value: number
}

export interface IBooleanSetting {
    type: 'boolean'
    value: boolean
}

export interface IDateTimeSetting {
    type: 'datetime'
    value: string
}

export type SettingVariant =
    | IStringSetting
    | INumericSetting
    | IBooleanSetting
    | IDateTimeSetting

export type ISetting = ISettingDetails & SettingVariant
