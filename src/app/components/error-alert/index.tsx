import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';

interface ErrorAlertProp {
	duplicatedEntry:boolean,
	errorMessage:string
}

export default function ErrorAlert({ duplicatedEntry = true, errorMessage }:ErrorAlertProp) {
	const t = useTranslations();
	const { locale } = useLocaleProvider();
	return (
		<div
			className={locale === 'ar'
				? 'bg-red-100 border-r-4 border-red-500 text-red-700 p-4 text-start '
				: 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-start '}
			role="alert"
		>
			<p className="font-bold">{t('errors')}</p>
			{duplicatedEntry
				? (<p>{t('duplicated_entry')} <span dir="ltr">{errorMessage}</span> </p>)
				: (<p>{t('')} <span dir="rtl">{errorMessage}</span> </p>)}
		</div>
	);
}
