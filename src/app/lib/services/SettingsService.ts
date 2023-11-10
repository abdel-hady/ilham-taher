import GetAsync from '@/app/util/ApiClient/GetAsync';
import GetPaginationAsync from '@/app/util/ApiClient/GetPaginationAsync';
import { MultiTypeSettings, VisualSettings } from '@/app/util/types/remote-types';
import { SETTINGS_URLS } from '@/app/util/url';

const VISUAL_SETTINGS_KEYS = {
	CHARITY_HERO_SETTING: 'CHARITY_HERO_SETTING',
	HERO_SETTING: 'HERO_SETTING',
	ABOUT_CHARITY_SETTING: 'ABOUT_CHARITY_SETTING',
	PRIVACY_POLICY_SETTING: 'PRIVACY_POLICY_SETTING',
	TERMS_AND_CONDITIONS_SETTING: 'TERMS_AND_CONDITIONS_SETTING',
	PODCAST_SETTING: 'PODCAST_SETTING',
	ABOUT_US_SETTING: 'ABOUT_US_SETTING',
	META_DATA_KEYWORD_SETTING: 'META_DATA_KEYWORD_SETTING',
	META_DATA_DESCRIPTION_SETTING: 'META_DATA_DESCRIPTION_SETTING',
};

const MULTI_TYPE_SETTINGS_KEYS = {
	FACEBOK_LINKE_SETTING: 'FACEBOK_LINKE_SETTING',
	INSTAGRAM_LINK_SETTING: 'INSTAGRAM_LINK_SETTING',
	TIKTOK_LINK_SETTING: 'TIKTOK_LINK_SETTING',
	TELEGRAM_LINK_SETTING: 'TELEGRAM_LINK_SETTING',
	YOUTUBE_LINK_SETTING: 'YOUTUBE_LINK_SETTING',
	APPLE_PODCAST_LINK_SETTING: 'APPLE_PODCAST_LINK_SETTING',
	GOOGLE_PODCAST_LINK_SETTING: 'GOOGLE_PODCAST_LINK_SETTING',
	SPOTIFY_PODCAST_LINK_SETTING: 'SPOTIFY_PODCAST_LINK_SETTING',
	WHATSAPP_VOLUNTEER_LINK_SETTING: 'WHATSAPP_VOLUNTEER_LINK_SETTING',
	WHATSAPP_NEED_HELP_LINK_SETTING: 'WHATSAPP_NEED_HELP_LINK_SETTING',
};

async function getVisualSettings(locale: string) {
	const url = SETTINGS_URLS.VISUAL_SETTINGS;
	const res = await GetPaginationAsync<VisualSettings>({
		url,
		locale,
		params: {
			pageSize: 50,
		},
	});
	return res;
}

async function getMultiTypeSettings(locale:string) {
	const url = SETTINGS_URLS.MULTI_TYPE_SETTINGS;
	const res = await GetPaginationAsync<MultiTypeSettings>({
		url,
		locale,
		params: {
			pageSize: 50,
		},
	});
	return res;
}

async function getMultiTypeSettingsByKey(locale:string, key:string) {
	const url = `${SETTINGS_URLS.MULTI_TYPE_SETTINGS}/${key}`;
	const res = await GetAsync<MultiTypeSettings>({
		url,
		locale,
	});
	return res;
}
async function getVisualSettingsByKey(locale:string, key:string) {
	const url = `${SETTINGS_URLS.VISUAL_SETTINGS}/${key}`;
	const res = await GetAsync<VisualSettings>({
		url,
		locale,
	});
	return res;
}

const SettingsService = {
	getVisualSettings,
	getMultiTypeSettings,
	MULTI_TYPE_SETTINGS_KEYS,
	VISUAL_SETTINGS_KEYS,
	getMultiTypeSettingsByKey,
	getVisualSettingsByKey,
};

export default SettingsService;
