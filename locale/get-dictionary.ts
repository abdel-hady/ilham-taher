import 'server-only';
import type { Locale } from './i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
	en: () => import('../dictionaries/en.json').then((module) => module.default),
	ar: () => import('../dictionaries/ar.json').then((module) => module.default),
} as any;

const getDictionary: any = (locale: Locale) => dictionaries[locale]();

export default getDictionary;
