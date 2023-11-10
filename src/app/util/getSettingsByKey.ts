/* eslint-disable max-len */
import { GeneralSettingsType } from './types/remote-types';


function getSettingByKey<T extends GeneralSettingsType>(settings: GeneralSettingsType[], settingKey: string): T | null {
	const matchingSettings = settings.filter((setting) => setting.settingKey === settingKey);
	if (matchingSettings.length === 0) {
		return null;
	}
	const matchingSetting = matchingSettings[0];

	return matchingSetting as T;
}


export default getSettingByKey;
