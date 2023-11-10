'use client';

import parseImageUrl from '@/app/util/parseImageUrl';
import React from 'react';
import ReactPlayer, { Config } from 'react-player';

export default function CustomAudioPlayer({ audioUrl }: { audioUrl : string }) {
	const config = {
		file: {
			attributes: {
				controlsList: 'nodownload',
			},
		},
	} as Config;

	return (
		<div className="mx-auto flex justify-center">
			<ReactPlayer
				url={parseImageUrl(audioUrl.trim())}
				width="400%"
				height="50px"
				playing={false}
				controls
				config={config}
			/>
		</div>
	);
}
