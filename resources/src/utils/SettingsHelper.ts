import {
    IBooleanSetting,
    INumericSetting,
    ISetting,
    IStringSetting,
    SettingKey,
    SettingType,
    SettingVariant
} from '../types/settings'

/**
 * A helper class for retrieving settings values
 */
export class SettingsHelper {
    settings: Record<SettingKey, ISetting>

    constructor(settings: Record<SettingKey, ISetting>) {
        this.settings = settings
    }

    /**
     * Retrieves a setting from the settings collection.
     */
    getSetting = (key: SettingKey): ISetting | null => {
        if (this.settings && this.settings[key]) {
            return this.settings[key]
        } else {
            return null
        }
    }

    /**
     * Returns a setting's value given a setting key.
     */
    getValue = (key: SettingKey): ISetting['value'] | null => {
        const setting: ISetting = this.getSetting(key)
        return setting && setting.value ? setting.value : null
    }
}
