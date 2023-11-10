/* eslint-disable max-len */

'use client';

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import { useAuth } from '@/app/components/providers/AuthProvider';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { InlineWidget } from 'react-calendly';

export default function CalndlyLinkPage() {
	const t = useTranslations();


	const { user } = useAuth();
	const { makeLocaleUrl } = useLocaleProvider();

	const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);

	useEffect(() => {
		const calendlyStoredUrl = sessionStorage.getItem('calendlyUrl');
		setCalendlyUrl(calendlyStoredUrl);
	}, []);


	let COMPONENT_TO_DISPLAY = null;
	if (calendlyUrl) {
		COMPONENT_TO_DISPLAY = (
			<InlineWidget
				url={calendlyUrl}
				styles={{ height: '1100px' }}
				prefill={{
					email: user?.email,
					name: `${user?.firstName} ${user?.lastName}`,
				}}
				pageSettings={{
					textColor: '#000',
					primaryColor: '#DFB05A',
				}}
			/>
		);
	} else {
		COMPONENT_TO_DISPLAY = (
			<div className="w-full h-[300px] flex items-center justify-center">
				<span className="loading loading-lg loading-spinner" />
			</div>
		);
	}

	return (
		<GeneralPageWrapper>
			<section className="border-2 border-gray-200 rounded-lg lg:p-24 py-4 md:py-10 flex flex-col gap-5">
				<div className="text-greenish flex flex-col md:relative">
					<Link
						className="btn btn-sm max-w-[300px] ml-4 mb-4 mr-auto md:absolute md:left-0"
						href={makeLocaleUrl('/home')}
					>
						<span>{t('home')}</span>
						<span><FontAwesomeIcon icon={faArrowLeft} /></span>
					</Link>
					<h1 className="text-3xl text-center">
						{t('calendly_page_title')}
					</h1>
					<p className="text-lg mt-5 w-4/5 mx-auto text-center">
						{t('calendly_page_description')}
					</p>
				</div>
				{COMPONENT_TO_DISPLAY}
			</section>
		</GeneralPageWrapper>
	);
}
