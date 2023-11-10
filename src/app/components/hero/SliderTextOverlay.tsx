'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import getSettingByKey from '@/app/util/getSettingsByKey';
import { VisualSettings } from '@/app/util/types/remote-types';
import SettingsService from '@/app/lib/services/SettingsService';
import EaseInFromLeft from '../animation/EaseInFromLeft';
import StandardBtn from '../common/StandardBtn';
import EaseInFromRight from '../animation/EaseInFromRight';
import { useLocaleProvider } from '../providers/LocaleProvider';
import { usePreviewDataProvider } from '../providers/PreviewDataProvider';

export default function SliderTextOverlay() {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});
	const t = useTranslations();
	const { isRtl } = useLocaleProvider();

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
	return (
		<div className="absolute p-2 top-0 left-0 z-10 w-full h-full xl:grid-cols-2 lg:h-[450px] xl:px-20 xl:h-[65svh] 2xl:h-[75svh] grid grid-cols-1" ref={ref}>
			<EaseInFromRight
				className="w-full h-full relative md:order-2 hidden xl:block"
				parentInView={inView}
			>
				<div className="absolute top-1/2 right-1/2 translate-x-32 -translate-y-1/2 w-2/3">
					<Image
						width={1000}
						height={1000}
						src="/assets/images/logo.svg"
						alt="hero"
						className="w-2/3 opacity-80"
					/>
				</div>
			</EaseInFromRight>
			<EaseInFromLeft
				className="flex flex-col gap-3 justify-center h-auto w-100 lg:h-full"
				parentInView={inView}
			>
				<div className={`flex flex-col  sm:gap-3 justify-center w-[70%]	 px-0 text-golden drop-shadow-xl ${isRtl ? 'text-right' : 'text-left'}`}>
					<h1 className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-lg text-align-center">
						{hero?.title}
					</h1>
					<p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white text-align-center">
						{hero?.description}
					</p>
					<div className={`
						text-sm flex justify-end justify-content-center w-full sm:justify-center md:justify-end ${isRtl ? 'xl:justify-end' : 'xl:justify-start'} mt-3`}
					>
						<Link href="#courses-section" onClick={(event) => handleLinkClick(event, '#courses-section')}>
							<StandardBtn text={t('discover_our_services')} />
						</Link>
					</div>
				</div>
			</EaseInFromLeft>
		</div>
	);
}
