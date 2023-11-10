'use client';

import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import GeneralPageWrapper from '../components/GeneralPageWrapper';
import { useLocaleProvider } from '../components/providers/LocaleProvider';
import LinkStandardBtn from '../components/common/LinkStandardBtn';

export default function NotFound() {
	const t = useTranslations();
	const { makeLocaleUrl } = useLocaleProvider();
	return (
		<GeneralPageWrapper>
			<div className="min-h-[500px] bg-white border-2 border-gray-200 rounded-lg grid items-center justify-center">
				<div className="w-[400px] mx-auto text-center">
					<Image
						src="/assets/images/404.svg"
						width="1000"
						height="1000"
						alt="no data"
						className="w-full"
					/>
					<h3 className="text-4xl mt-5">
						{t('not_found')}
					</h3>
					<div className="mt-4">
						<LinkStandardBtn text={t('home')} href={makeLocaleUrl('/home')} />
					</div>
				</div>
			</div>
		</GeneralPageWrapper>
	);
}
