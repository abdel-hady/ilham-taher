'use client';

import React from 'react';
import Image from 'next/image';
import PodcastSectionTextOverlay from '@/app/components/podcast/PodcastSectionTextOverlay';
import getSettingByKey from '@/app/util/getSettingsByKey';
import { usePreviewDataProvider } from '@/app/components/providers/PreviewDataProvider';
import SettingsService from '@/app/lib/services/SettingsService';
import { MultiTypeSettings, VisualSettings } from '@/app/util/types/remote-types';
import parseImageUrl from '@/app/util/parseImageUrl';
import SectionTitle from '@/app/components/common/SectionTitle';

function SideImage() {
	const { settings } = usePreviewDataProvider();
	const podcastSettings = getSettingByKey<VisualSettings>(
		settings,
		SettingsService.VISUAL_SETTINGS_KEYS.PODCAST_SETTING,
	);

	const spotifySettings = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.SPOTIFY_PODCAST_LINK_SETTING,
	);


	const googleSettings = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.GOOGLE_PODCAST_LINK_SETTING,
	);


	const appleSettings = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.APPLE_PODCAST_LINK_SETTING,
	);

	const icons = [
		{
			id: 1,
			icon: '/assets/images/podcast.png',
			url: appleSettings?.value ?? '',
		},
		{
			id: 2,
			icon: '/assets/images/google_podcast.png',
			url: googleSettings?.value ?? '',
		},
		{
			id: 3,
			icon: '/assets/images/spotify.png',
			url: spotifySettings?.value ?? '',
		},
	];

	return (
		<div className="relative rounded-lg overflow-hidden h-[500px] sm:h-[700px]">
			<Image
				src={parseImageUrl(podcastSettings?.imageFileUrl!)}
				alt="children"
				width="2000"
				height="2000"
				className="w-full object-none sm:object-cover object-left md:object-top lg:object-left h-[500px] sm:h-[700px]"
			/>
			<PodcastSectionTextOverlay
				title={podcastSettings?.title ?? ''}
				description={podcastSettings?.description ?? ''}
				icons={icons}
			/>
		</div>
	);
}

export default function PodcastSection({ title }: { title: string }) {
	return (
		<section className="w-full text-greenish flex flex-col gap-5">
			<SectionTitle title={title} />
			<div dir="ltr" className="border-2 border-gray-200 container shadow-lg rounded-lg mx-auto relative flex flex-col gap-5 sm:flex-col md:flex-col p-0 lg:flex-row">
				<div className="w-full">
					<SideImage />
				</div>
			</div>
		</section>
	);
}
