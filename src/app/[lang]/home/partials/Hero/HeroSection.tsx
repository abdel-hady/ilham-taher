'use client';

import SliderTextOverlay from '@/app/components/hero/SliderTextOverlay';
import { usePreviewDataProvider } from '@/app/components/providers/PreviewDataProvider';
import SettingsService from '@/app/lib/services/SettingsService';
import getSettingByKey from '@/app/util/getSettingsByKey';
import parseImageUrl from '@/app/util/parseImageUrl';
import { VisualSettings } from '@/app/util/types/remote-types';
import Image from 'next/image';
import React from 'react';
import './styles.css';

interface HeroSectionProps {
	className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
	const { settings } = usePreviewDataProvider();
	const hero = getSettingByKey<VisualSettings>(
		settings,
		SettingsService.VISUAL_SETTINGS_KEYS.HERO_SETTING,
	);

	return (

		<div dir="ltr" className={`relative overflow-hidden lg:h-[450px] 2xl:h-[75svh] ${className}`}>
			<div className="width-125 width-110">
				<Image
					alt="Hero"
					src={parseImageUrl(hero?.imageFileUrl!)}
					width={2000}
					height={2000}
					className="object-fill 2xl:object-cover w-full h-auto sm:h-96 lg:h-[450px] xl:h-full
					max-[1023px]:relative right-80 right-95"
					loading="eager"
				/>
			</div>
			<SliderTextOverlay />
		</div>
	);
}
