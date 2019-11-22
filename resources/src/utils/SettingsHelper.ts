import {
    IBooleanSetting,
    INumericSetting,
    ISetting,
    IStringSetting,
    SettingKey,
    SettingType,
    SettingVariant
} from '../types/settings'

export class SettingsHelper {
    settings: Record<SettingKey, ISetting>

    constructor(settings: Record<SettingKey, ISetting>) {
        this.settings = settings
    }

    get = (key: SettingKey): ISetting | null => {
        if (this.settings && this.settings[key]) {
            return this.settings[key]
        }
    }
}
