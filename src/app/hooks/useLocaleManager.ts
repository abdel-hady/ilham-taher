import { useEffect, useState } from 'react';
import { i18n, Locale } from '../../../locale/i18n-config';

interface ObjectOfLocales {
	[key: string]: any;
}
export interface LocaleNamingAndIcon {

	name: string;
	locale: string;
	icon: string;
}

export const EngObj: LocaleNamingAndIcon = {
	name: 'English',
	icon: 'https://cdn-icons-png.flaticon.com/512/197/197374.png',
	locale: 'en',
};

export const ArObj: LocaleNamingAndIcon = 		{
	name: 'العربية',
	icon: 'https://cdn-icons-png.flaticon.com/512/323/323301.png',
	locale: 'ar',

};
export const FrObj: LocaleNamingAndIcon = 		{
	name: 'Française',
	icon: 'https://cdn-icons-png.flaticon.com/512/10600/10600860.png',
	locale: 'fr',

};

const useLocaleManager = () => {
	const [locale, setLocale] = useState<string>(i18n.defaultLocale);
	const [isRtl, setIsRtl] = useState<boolean>(false);

	const [currentLocaleInfo, setCurrentLocaleInfo] = useState<LocaleNamingAndIcon>(EngObj);
	const [otherLocaleInfoList, setOtherLocaleInfoList] = useState<LocaleNamingAndIcon[]>([
		ArObj, FrObj,
	]);

	const localeNamingAndIcon:ObjectOfLocales = {
		ar: ArObj,
		en: EngObj,
		fr: FrObj,
	};

	function getCurrentAndOtherLocales(currentLocale: string): any {
		const currentLocaleObj = localeNamingAndIcon[currentLocale];
		const otherLocalesList = Object.keys(localeNamingAndIcon)
			.filter((l) => l !== currentLocale)
			.map((l) => localeNamingAndIcon[l]);

		return [currentLocaleObj, otherLocalesList];
	}


	function getLocaleFromUrl(): string {
		const pathComponents = window.location.pathname.split('/');
		const languageCode = pathComponents[1] || i18n.defaultLocale;
		return languageCode;
	}

	function setNewLocale(newLocale: Locale): void {
		const pathComponents = window.location.pathname.split('/');
		const currentLocale = pathComponents[1];
		const newPathname = window.location.pathname.replace(`/${currentLocale}/`, `/${newLocale}/`);
		const newUrl = `${newPathname}${window.location.search}${window.location.hash}`;
		window.location.href = newUrl;
		setLocale(newLocale);
	}

	function makeLocaleUrl(url: string): string {
		const hasLeadingSlash = url.startsWith('/');
		if (hasLeadingSlash) {
			return `/${locale}${url}`;
		}
		return `/${locale}/${url}`;
	}

	useEffect(() => {
		setLocale(getLocaleFromUrl());
	}, []);

	useEffect(() => {
		const [localeObj, otherLcoalsList] = getCurrentAndOtherLocales(locale);
		setCurrentLocaleInfo(localeObj);
		setOtherLocaleInfoList(otherLcoalsList);

		if (locale === 'ar') {
			setIsRtl(true);
		} else {
			setIsRtl(false);
		}
	}, [locale]);


	return {
		locale,
		setNewLocale,
		currentLocaleInfo,
		otherLocaleInfoList,
		getLocaleFromUrl,
		isRtl,
		makeLocaleUrl,
	};
};

export default useLocaleManager;
