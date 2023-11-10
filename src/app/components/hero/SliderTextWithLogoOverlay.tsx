'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { VisualSettings } from '@/app/util/types/remote-types';
import SettingsService from '@/app/lib/services/SettingsService';
import getSettingByKey from '@/app/util/getSettingsByKey';
import EaseInFromLeft from '../animation/EaseInFromLeft';
import StandardBtn from '../common/StandardBtn';
import { usePreviewDataProvider } from '../providers/PreviewDataProvider';

export default function SliderTextWithLogoOverlay() {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	const { settings } = usePreviewDataProvider();

	const hero = getSettingByKey<VisualSettings>(
		settings,
		SettingsService.VISUAL_SETTINGS_KEYS.HERO_SETTING,
	);

	const handleLinkClick = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		href: string,
	) => {
		event.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			const topOffset = target.getBoundingClientRect().top + window.pageYOffset;
			window.scrollTo({
				top: topOffset,
				behavior: 'smooth',
			});
		}
	};
	const t = useTranslations();
	return (
		<div className="absolute top-0 left-0 z-10 w-full h-full grid grid-cols-1" ref={ref}>
			<EaseInFromLeft
				parentInView={inView}
				className="flex flex-col gap-3 justify-center h-100 w-100"
			>
				<div className="flex flex-col gap-5 justify-center items-center h-100 w-100 px-5 text-greenish text-center">
					<h1 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">
						{hero?.title}
					</h1>
					<p className=" text-lg sm:text-xl md:text-2xl lg:text-3xl">
						{hero?.description}
					</p>
					<div className="w-full flex justify-center md:justify-end lg:justify-end xl:justify-end mt-3">
						<StandardBtn text={t('discover_our_services')} btnSize="medium" onClick={(event) => handleLinkClick(event, '#courses-section')} />
					</div>
				</div>
			</EaseInFromLeft>
		</div>
	);
}
