'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faInstagram, faTiktok, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import getSettingByKey from '@/app/util/getSettingsByKey';
import SettingsService from '@/app/lib/services/SettingsService';
import { MultiTypeSettings } from '@/app/util/types/remote-types';
import DropdownLocale from './partials/DropdownLocale';
import { useAuth } from '../providers/AuthProvider';
import { useLocaleProvider } from '../providers/LocaleProvider';
import ProfileDropdown from './partials/ProfileDropdown';
import { usePreviewDataProvider } from '../providers/PreviewDataProvider';


export default function TopNavbar() {
	const { isLoggedIn } = useAuth();
	const { makeLocaleUrl } = useLocaleProvider();

	const { settings } = usePreviewDataProvider();

	// console.log(settings);
	const insta = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.INSTAGRAM_LINK_SETTING,
	);

	const tiktok = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.TIKTOK_LINK_SETTING,
	);

	const youtube = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.YOUTUBE_LINK_SETTING,
	);

	const icons = [
		{ icon: faTiktok, link: tiktok?.value ?? '#', id: 1 },
		{ icon: faInstagram, link: insta?.value ?? '#', id: 2 },
		{ icon: faYoutube, link: youtube?.value ?? '#', id: 3 },
	];
	const t = useTranslations();
	return (
		<div className="w-full bg-dark-green text-white" dir="ltr">
			<div className="container mx-auto flex items-center justify-between">
				<div className="flex items-center gap-3">
					{icons.map((icn) => (
						<a href={icn.link} target="_blank" rel="noreferrer" key={icn.id}>
							<div className="transition duration-300 hover:scale-110 hover:bg-golden hover:text-dark-green text-white w-7 h-7 flex items-center justify-center rounded-full">
								<FontAwesomeIcon icon={icn.icon} size="lg" />
							</div>
						</a>

					))}
				</div>
				<div className="flex items-center gap-3">
					<div>
						<DropdownLocale />
					</div>
					{isLoggedIn()
						? (
							<div>

								<ProfileDropdown />
							</div>
						)
						:					(
							<Link href={makeLocaleUrl('/auth/login')} className="flex items-center">
								<span className="text-sm uppercase transition duration-150 hover:scale-110">
									{t('login')}
								</span>
							</Link>
						)}
				</div>
			</div>
		</div>
	);
}
