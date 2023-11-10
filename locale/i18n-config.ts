import configs from './config.json';

export const i18n = {
	defaultLocale: configs.defaultLocale,
	locales: configs.locales as string[],
} as const;

export type Locale = typeof i18n['locales'][number];
