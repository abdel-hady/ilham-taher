/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */

'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import EaseInFromLeft from '../animation/EaseInFromLeft';
import { useLocaleProvider } from '../providers/LocaleProvider';
import LinkStandardBtn from '../common/LinkStandardBtn';

export default function ChildrenSectionTextOverlay({
	title,
	description,
}: { title:string; description:string; }) {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});
	const t = useTranslations();
	const { isRtl, makeLocaleUrl } = useLocaleProvider();
	return (
		<div ref={ref}>
			<EaseInFromLeft
				className={`absolute bottom-0 top-0 right-0 left-0 flex flex-col justify-center items-center sm:${isRtl ? 'items-end' : ' items-start'} gap-2 md:gap-5 w-full sm:w-[75%] p-6 md:p-12`}
				parentInView={inView}
			>
				<div className="text-greenish w-full flex flex-col">
					<h1 className={`font-bold text-3xl flex items-end justify-center ${isRtl ? 'sm:justify-end' : 'sm:justify-start'} sm:text-2xl md:text-3xl lg:text-4xl`}>
						{title}
					</h1>
					<p className={` text-lg flex text-center justify-center ${isRtl ? 'sm:justify-end sm:text-right' : 'sm:justify-start sm:text-left'} sm:text-lg md:text-xl lg:text-xl mt-2`}>
						{description}
					</p>
				</div>
				<div className={`w-full flex justify-center ${isRtl ? 'sm:justify-end' : 'sm:justify-start'}`}>
					<div>
						<LinkStandardBtn text={t('learn_more')} href={makeLocaleUrl('/about-us/new-me-child-charity')} />
					</div>
				</div>
			</EaseInFromLeft>
		</div>
	);
}
