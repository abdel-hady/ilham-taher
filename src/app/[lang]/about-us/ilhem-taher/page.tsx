/* eslint-disable max-len */
import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import EaseInFromLeft from '@/app/components/animation/EaseInFromLeft';
import EaseInFromRight from '@/app/components/animation/EaseInFromRight';
import SettingsService from '@/app/lib/services/SettingsService';
import { calculateDir } from '@/app/util/RtlUtils';
import parseImageUrl from '@/app/util/parseImageUrl';
import { GeneralPageProp } from '@/app/util/types/local-types';
import Image from 'next/image';
import React from 'react';

export default async function IlhemTaherPage({ params: { lang } }: GeneralPageProp) {
	const aboutUs = await SettingsService.getVisualSettingsByKey(lang, SettingsService.VISUAL_SETTINGS_KEYS.ABOUT_US_SETTING);
	return (
		<GeneralPageWrapper>
			<section
				dir="ltr"
				className="shadow-lg py-20 bg-white border-2 border-gray-200 rounded-lg bg-flowers"
			>
				<div className="mx-auto flex flex-col-reverse lg:flex-row items-start gap-16 w-4/5">
					<EaseInFromLeft parentInView className="w-full flex flex-col gap-6 text-greenish md:w-4/5">
						<div dir={calculateDir(lang)}>
							<h3 className=" text-3xl font-bold">{aboutUs?.title ?? ''}</h3>
							<p>{aboutUs?.description ?? ''}</p>
						</div>
					</EaseInFromLeft>
					<EaseInFromRight parentInView>
						<Image
							width={1000}
							height={1000}
							alt={`${aboutUs?.title ?? ''} cover image`}
							src={parseImageUrl(aboutUs?.imageFileUrl!)}
							className="object-cover rounded-lg"
						/>
					</EaseInFromRight>
				</div>
			</section>
		</GeneralPageWrapper>
	);
}
