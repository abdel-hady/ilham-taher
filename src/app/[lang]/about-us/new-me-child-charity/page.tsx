/* eslint-disable max-len */
/* eslint-disable no-irregular-whitespace */

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import EaseInFromLeft from '@/app/components/animation/EaseInFromLeft';
import EaseInFromRight from '@/app/components/animation/EaseInFromRight';
import SettingsService from '@/app/lib/services/SettingsService';
import { calculateDir } from '@/app/util/RtlUtils';
import parseImageUrl from '@/app/util/parseImageUrl';
import { GeneralPageProp } from '@/app/util/types/local-types';
import Image from 'next/image';
import React from 'react';

export default async function ChildrenSupportPage({ params: { lang } }:GeneralPageProp) {
	const aboutCharity = await SettingsService.getVisualSettingsByKey(lang, SettingsService.VISUAL_SETTINGS_KEYS.ABOUT_CHARITY_SETTING);

	return (
		<GeneralPageWrapper>
			<section
				dir="ltr"
				className="shadow-lg py-20 bg-white border-2 border-gray-200 rounded-lg bg-flowers"
			>
				<div className="mx-auto flex flex-col-reverse lg:flex-row items-start gap-16 w-4/5">
					<EaseInFromLeft parentInView className="w-full flex flex-col gap-6 text-greenish  md:w-4/5">
						<div dir={calculateDir(lang)}>
							<h3 className=" text-3xl font-bold">{aboutCharity?.title ?? ''}</h3>
							<p className="text-gray-600">{aboutCharity?.description ?? ''}</p>
						</div>
					</EaseInFromLeft>
					<EaseInFromRight parentInView>
						<Image
							width={1000}
							height={1000}
							alt={`${aboutCharity?.title ?? ''} cover image`}
							src={parseImageUrl(aboutCharity?.imageFileUrl!)}
							className="object-cover rounded-lg"
						/>
					</EaseInFromRight>
				</div>
			</section>
		</GeneralPageWrapper>
	);
}
