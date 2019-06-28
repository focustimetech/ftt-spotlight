export interface ISettingsGroup {
    name: string
    settings: ISetting[]
}

export interface ISetting {
    id: number,
    key: string,
    value: any,
    type: string,
    description: string
}
