/* eslint-disable max-len */
import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import SettingsService from '@/app/lib/services/SettingsService';
import { GeneralPageProp } from '@/app/util/types/local-types';
import React from 'react';
import getDictionary from '../../../../locale/get-dictionary';

export default async function Policy({ params: { lang } }:GeneralPageProp) {
	const privacySettings = await SettingsService.getVisualSettingsByKey(lang, SettingsService.VISUAL_SETTINGS_KEYS.PRIVACY_POLICY_SETTING);
	const dic = await getDictionary(lang);
	return (
		<GeneralPageWrapper>
			<section className="shadow-lg p-10 sm:p-20 bg-white border border-2 border-gray-200 rounded-lg">
				<div className="mx-auto flex flex-col-reverse lg:flex-row items-start gap-16">
					<div className="w-full flex flex-col gap-6 text-greenish">
						<h3 className="text-3xl font-bold">
							{dic.privacy_policy}
						</h3>
						<p>{privacySettings?.description}</p>
					</div>
				</div>
			</section>
		</GeneralPageWrapper>
	);
}
