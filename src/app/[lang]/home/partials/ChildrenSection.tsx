'use client';

import React from 'react';
import ChildrenStatsCountUp from '@/app/components/children/ChildrenStatsCountUp';
import Image from 'next/image';
import ChildrenSectionTextOverlay from '@/app/components/children/ChildrenSectionTextOverlay';
import { CharitySlider, VisualSettings } from '@/app/util/types/remote-types';
import { usePreviewDataProvider } from '@/app/components/providers/PreviewDataProvider';
import getSettingByKey from '@/app/util/getSettingsByKey';
import SettingsService from '@/app/lib/services/SettingsService';
import parseImageUrl from '@/app/util/parseImageUrl';

function SideImage() {
	const { settings } = usePreviewDataProvider();
	const charityHero = getSettingByKey<VisualSettings>(
		settings,
		SettingsService.VISUAL_SETTINGS_KEYS.CHARITY_HERO_SETTING,
	);

	return (
		<div className="relative rounded-lg overflow-hidden h-96">
			<Image
				src={parseImageUrl(charityHero?.imageFileUrl!)}
				alt="children"
				width="2000"
				height="2000"
				className="w-full object-cover object-left sm:object-right h-96"
			/>
			<ChildrenSectionTextOverlay
				title={charityHero?.title ?? ''}
				description={charityHero?.description ?? ''}
			/>
		</div>
	);
}

interface ChildrenSectionProps {
	sliders: CharitySlider[]
}

export default function ChildrenSection({ sliders }: ChildrenSectionProps) : JSX.Element {
	return (
		<div dir="ltr" className="relative flex flex-col gap-5 sm:flex-col md:flex-col lg:flex-row">
			<div className="w-full lg:w-2/3 border-2 border-gray-200 rounded-lg">
				<SideImage />
			</div>
			<div className="border-2 border-gray-200 rounded-lg w-full lg:w-1/3 py-0 shadow-lg flex items-center justify-center">
				<ChildrenStatsCountUp charitySliders={sliders} />
			</div>
		</div>
	);
}
